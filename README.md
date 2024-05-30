**Over all Architecture of this project**

**User sends file to Backend**
**Storing files on server(this makes process slow so if you want to optimize your chat app remove the writing text file and saving file on server (both pdf fille and text file will be save din public/temp folder))**
**Sending File to Cloudinary(cloudinary is free so in case you are testing it's great for that) similar to bucket S3**
**Created a queue in controller file to sync the process using BULLMQ**
**Processing in worker.js file  
 created raw text from file path and then chunked it into 1000 then sended it to generate vector embeddings usig Gemini and save the vector embeddings into POSTGRES DB for this you can pull pgvector docker image and connect it**

**SO FIRST PART COMPLETED USER PROJECT GOT CREATED AND SAVED**

**NOW USER SENDS A PROMPT**
**Change it into Vector embeddings same process and Query to DB to get nearest neighbor i used cosine you can use L1, L2 based on your needs**
**DB returns all data extract text from it**
**Now Clean the extracted text  i wrote simple algo to clean so here we can do optimization at two place if you want 1st don't ask all the data only ask for text to send to llm and use some library to clean the data**
**Send to LLM**
**returned response send to user**

# Project Architecture

## Overview
This document outlines the overall architecture of the project and the workflow from file upload to response delivery.

## Workflow

**User sends file to Backend**  
**Storing files on server**  
This makes the process slow. To optimize your chat app, you can remove the writing text file and saving file on the server (both PDF files and text files will be saved in the `public/temp` folder).

**Sending File to Cloudinary**  
Cloudinary is free and great for testing. It functions similarly to AWS S3 buckets.

**Queue Management**  
A queue is created in the controller file to sync the process using BULLMQ.

**File Processing**  
Processing is done in `worker.js` file:
- Created raw text from the file path.
- Chunked the text into 1000-character segments.
- Sent the segments to generate vector embeddings using Gemini.
- Saved the vector embeddings into a PostgreSQL database.  
  (For this, you can pull the `pgvector` Docker image and connect it.)

**First Part Completed**  
User project got created and saved.

## Prompt Handling

**User sends a prompt**  
Convert the prompt into vector embeddings using the same process and query the database to get the nearest neighbor. I used cosine similarity; you can use L1 or L2 based on your needs.

**Database Query**  
The database returns all relevant data. Extract the text from the returned data.

**Text Cleaning**  
Clean the extracted text. I wrote a simple algorithm to clean the text. Optimization can be done in two places:
1. Don't ask for all the data, only request the text to send to the LLM.
2. Use a library to clean the data.

**Sending to LLM**  
Send the cleaned text to the LLM (Large Language Model).

**Returning Response**  
Receive the response from the LLM and send it back to the user.





 ![IMG_20240530_194803_157 (1)](https://github.com/VARUN-KUSH/WebApp-to-chat-with-PDFs/assets/120031014/b3453ca2-bb19-487d-87ea-25d310b41161)
