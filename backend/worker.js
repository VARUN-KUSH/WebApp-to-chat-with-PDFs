import { Worker } from "bullmq";
import { pdfprocessing } from "./pdfprocessing.js";
import {dboperations} from './db/pgvector.js'
//import { uploadOnCloudinary } from "../utils/cloudinary.js";
import generateEmbeddings from "./utils/generatevectorembeddings.js";

      // Extract text content from the PDF

      // Proceed with further steps: Text Preprocessing, chunking and sending to embedding function to create and return created embeddings
      // Embedding Generation, and Storing in PostgreSQL
const worker = new Worker(
  "pdfQueue",
  async (job) => {
    const { title, description, pdffilepath} = job.data;
    //console.log(title, description, pdfBuffer)
    console.log("in wroker");
    if (!title || !description || !pdffilepath) {
      console.error({ message: "Title, description, and PDF file are required." , error});
    } 
    try {
      const rawText = await pdfprocessing(pdffilepath);
      // console.log("PDF processed and text file created at:", rawtext);
      const chunkSize = 1000; // Define the chunk size
      const textChunks = [];
      for (let i = 0; i < rawText.length; i += chunkSize) {
        textChunks.push(rawText.substring(i, i + chunkSize));
      }

     

      const pdfTextembeddings = [];
      for (const chunk of textChunks) {
        const chunkEmbeddings = await generateEmbeddings(chunk);
        pdfTextembeddings.push(chunkEmbeddings);
      }
      console.log(pdfTextembeddings.length)
      console.log("chunk value :", textChunks.length)
      await dboperations(title, description, textChunks, pdfTextembeddings)
      // if(dboperationhealth == false) console.error({error:"error while db operation it may be in connecting or storing"})
      // return 
    // {success: "all db operations done file saved in db ansd vector embeddings created"}
      
    } catch (error) {
      console.error(`Error processing PDF: ${error.message}`);
      return false;
    }
    
  },
  {
    connection: {
      host: "127.0.0.1",
      port: "6379",
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed: ${err}`);
});


//const titleResponse = await generateEmbeddings(title);
//   const titleEmbedding = titleResponse[0];

//   // Generate embeddings for description
//   const descriptionResponse = await generateEmbeddings(description);
//   const descriptionEmbedding = descriptionResponse[0];
