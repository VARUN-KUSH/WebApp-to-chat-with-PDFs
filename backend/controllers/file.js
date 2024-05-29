import { Queue, QueueEvents, Job } from "bullmq";
import { v4 as uuidv4 } from "uuid";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { EventEmitter } from 'events';


// Increase the limit for all EventEmitters
EventEmitter.defaultMaxListeners = 20;

//import dboperations from '../db/pgvector.js'

export const processFilesandsaveinpostgres = async (req, res) => {
  const pdfQueue = new Queue("pdfQueue", {
    connection: {
      host: "127.0.0.1",
      port: "6379",
    },
  
  });
  const queueEvents = new QueueEvents("pdfQueue", {
    connection: {
      host: "127.0.0.1",
      port: "6379",
    },
  
  });

  console.log(req.body);
  try {
    const { title, description } = req.body;
    console.log(title, description);
    // console.log("Request File:", req.file);
    const pdfFile = req.file?.path;
    // console.log(pdfFile)

    if (!title || !description || !pdfFile) {
        res
        .status(400) 
        .json({ message: "Title, description, and PDF file are required." });
    }
 
    // await dboperations()
    const cloudinary = await uploadOnCloudinary(pdfFile)
    console.log("sending to cloud success")

    const jobId = uuidv4();
    const workerresolve = await pdfQueue.add(jobId, {
      title,
      description,
      pdffilepath: pdfFile,
    });

    
  } catch (error) {
    console.error("Error processing files and saving in Postgres:", error);
    // res.status(500).json({ error: "An error occurred while processing files" });
  }
  console.log("hi");

  

  queueEvents.on("completed", async (jobId) => {
    res
      .status(201)
      .json({
        success:
          "all db operations done file saved in db ansd vector embeddings created",
      });
  });
};

