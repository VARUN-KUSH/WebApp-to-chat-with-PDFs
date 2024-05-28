// import { Queue } from "bullmq";
import { v4 as uuidv4 } from "uuid";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import dboperations from '../db/pgvector.js'

// const pdfQueue = new Queue("pdfQueue", {
//     connection: {
//         host: '127.0.0.1',
//         port: '6379'
//     }
// });

export const processFilesandsaveinpostgres = async (req, res) => {
  console.log(req.body);
  try {
    const { title, description } = req.body;
    console.log(title, description)
    console.log("Request File:", req.file);
    const pdfFile = req.file?.path
    console.log(pdfFile)

    if (!title || !description || !pdfFile) {
      return res
        .status(400)
        .json({ message: "Title, description, and PDF file are required." });
    }
    
    //await dboperations()
    //const cloudinary = await uploadOnCloudinary(pdfFile)
    
    // const jobId = uuidv4();
    // await pdfQueue.add(jobId, {
    //   title,
    //   description,
    //   pdffilepath: pdfFile,
    // });
    
    res.status(201).json({ message: 'File metadata received and processing started'});
  } catch (error) {
    // console.error("Error processing files and saving in Postgres:", error);
    res.status(500).json({ error: "An error occurred while processing files" });
  }
  console.log("hi");

};
