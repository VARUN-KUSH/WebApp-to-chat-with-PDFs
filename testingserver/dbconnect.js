import pg from "pg";
import pgvector from "pgvector/pg";

(async () => {
  const { Client } = pg;

  const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432
  });

  await client.connect();
  console.log("connection success");

  // enable extension
  await client.query("CREATE EXTENSION IF NOT EXISTS vector");
  await pgvector.registerType(client);
})();

// async function dboperations() {
//     try {

//     } catch (error) {
//         console.error("arror detected", error)
//     }

//   }

//   export default dboperations
