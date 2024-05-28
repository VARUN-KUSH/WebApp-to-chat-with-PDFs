import pg from "pg";
// //import pgvector from "pgvector/pg";


const { Client } = pg
 
const client = new Client({
  user: 'varunkush',
  password: 'kush123',
  host: '127.0.0.1',
  port: 5432,
  database: 'pdfstore',
})


// //await client.connect();
// //console.log("db connection successfull")
// // //connecting to postgres
// // //storing to postgres
// // //querying to postreg

// async function dboperations(
// //   // titleEmbedding,
// //   // descriptionEmbedding,
// //   // pdfTextembeddings,
// //   // title, 
// //   // description, 
// //   // textChunks
// ) {
//   try {
   // await client.connect();
//     console.log("db connection successfull")

//   //   await client.query("CREATE EXTENSION IF NOT EXISTS vector");
//   //  await pgvector.registerType(client); 

//   //   await client.query("DROP TABLE IF EXISTS documents");
//   //   await client.query(
//   //     "CREATE TABLE documents (id bigserial PRIMARY KEY, title text, description text, pdftext text, title_embedding vector(768), description_embedding vector(768), pdftext_embedding vector(768))')"
//   //   );

//   //   console.log("in vectordb")
//   //   for (let i = 0; i < textChunks.length; i++) {
//   //       await client.query(
//   //         'INSERT INTO documents (title, description, pdftext, title_embedding, description_embedding, pdftext_embedding) VALUES ($1, $2, $3, $4, $5, $6)',
//   //         [
//   //           title,
//   //           description,
//   //           textChunks[i],
  //           pgvector.toSql(titleEmbedding),
  //           pgvector.toSql(descriptionEmbedding),
  //           pgvector.toSql(pdfTextembeddings[i])
  //         ]
  //       );
  //     }

    

//     await client.end();
//     return true
//   } catch (error) {
//     console.error(`Error storing in vectorDB: ${error.message}`);
//   }
// }

async function dboperations() {
  await client.connect()
  console.log("connection success")

}

export default dboperations