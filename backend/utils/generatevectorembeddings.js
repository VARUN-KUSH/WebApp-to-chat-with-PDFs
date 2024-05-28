import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateEmbeddings(text) {
  // For embeddings, use the embedding-001 model
  const model = genAI.getGenerativeModel({ model: "embedding-001"});

  const result = await model.embedContent(text);
  const embedding = result.embedding;
  return embedding.values
  //console.log(embedding.values);
  
}

export default generateEmbeddings
