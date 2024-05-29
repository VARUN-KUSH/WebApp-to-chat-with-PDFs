import generateEmbeddings from "../utils/generatevectorembeddings.js";
import {findNearestNeighbor} from '../db/pgvector.js'

const chathandletollm = async(req, res) => {
    const {chats} = req.body
    if(!chats) {
        console.error(401, "didn't received user message")
    }

    const chatembeddingresponse = await generateEmbeddings(chats)

    if (!chatembeddingresponse) {
        console.error(400,"embeddings for user chat not created")
    return }
    console.log(chatembeddingresponse ,"chatembed")

    await findNearestNeighbor(chatembeddingresponse, chats, res)
    
}

export {chathandletollm}