import { Talktollm } from "../utils/Talktollm.js";
import pg from "pg";
import pgvector from "pgvector/pg";

const { Client } = pg;

// // //connecting to postgres
// // //storing to postgres
// // //querying to postreg

async function dboperations(title, description, textChunks, pdfTextembeddings) {
  const client = new Client({
    user: "postgres",
    password: "kush123",
    host: "localhost",
    port: 5432,
  });
  try {
    await client.connect();
    console.log("db connection successfull");

    await client.query("CREATE EXTENSION IF NOT EXISTS vector");
    await pgvector.registerType(client);

    await client.query("DROP TABLE IF EXISTS documents");
    await client.query(
      "CREATE TABLE documents (id bigserial PRIMARY KEY, title text, description text, textChunks text, embeddings vector(768))"
    );

    
    console.log("in vectordb");
    for (let i = 0; i < textChunks.length; i++) {
      console.log("here we are");
      await client.query(
        "INSERT INTO documents (title, description, textChunks, embeddings) VALUES ($1, $2, $3, $4)",
        [
          title,
          description,
          textChunks[i],
          pgvector.toSql(pdfTextembeddings[i]),
        ]
      );
    }
    await client.end();
    console.log("success");

    return true;
  } catch (error) {
    console.error(`Error storing in vectorDB: ${error.message}`);
  }
}

//Function to find the nearest neighbor based on the user prompt embedding
const findNearestNeighbor = async (
  userpromptqueryEmbedding,
  userprompt,
  res
) => {
  const client = new Client({
    user: "postgres",
    password: "kush123",
    host: "localhost",
    port: 5432,
  });
  // Connect to the PostgreSQL database
  await client.connect();
  try {
    // SQL query to find the 5 nearest neighbors based on the embedding distance
    const query = `
    SELECT *
    FROM documents
    ORDER BY embeddings <=> $1
    LIMIT 5
  `;
    // Execute the query with the provided user prompt embedding
    const { rows } = await client.query(query, [
      pgvector.toSql(userpromptqueryEmbedding),
    ]);

     // Check if any rows were returned
    if (rows.length == 0)  console.log("query is unsuccessfull to db");
    
    // Close the database connection
    await client.end();
    console.log(rows);
    console.log(userprompt);

    // Extract and split text chunks from the retrieved rows
    const textChunks = rows.map((row) => row.textchunks.split("\t"));
    console.log("Text chunks:", textChunks);

     // Clean the text chunks by replacing newlines and trimming spaces
    const cleanedChunks = textChunks.map((chunkArray) =>
      chunkArray.map((chunk) => chunk.replace(/\r\n/g, " ").trim())
    );

    // Join cleaned chunks into single strings per original textchunk
    const combinedText = cleanedChunks.map((chunkArray) =>
      chunkArray.join(" ")
    );

    // Join all combined text into a single string if needed
    const completeText = combinedText.join(" ").trim();

    // console.log(completeText);

    // Send the combined text to a language model and get the response
    const llmResponse = await Talktollm(completeText, userprompt)
    console.log(llmResponse) //log llmresponse
    return res.status(200).json({userresponse: llmResponse});
  } catch (error) {
    console.log("error while searchingDB", error);
  }
};

export { dboperations, findNearestNeighbor };
