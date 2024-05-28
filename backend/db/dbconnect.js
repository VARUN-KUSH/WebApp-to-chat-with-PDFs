// import pg from "pg";
// import pgvector from 'pgvector/pg';

// const { Client } = pg;
// const client = new Client({
//   user: "varun",
//   password: "varun123",
//   host: "127.0.0.1",
//   port: 5432,
//   database: "pdfDB",
// });

// async function connect() {
//   try {
//     await client.connect();
//     // await client.query('CREATE EXTENSION IF NOT EXISTS vector');
//     // await pgvector.registerType(client);
//     // await client.query('DROP TABLE IF EXISTS documents');
//     // await client.query('CREATE TABLE documents (id bigserial PRIMARY KEY, title VARCHAR(255) NOT NULL, description text not null, pdf_content text, embedding vector(768))');

//     console.log("Connected to PostgreSQL database successfully!");
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//     process.exit(1); // Exit process on connection failure
//   }

// }

// export { connect };
