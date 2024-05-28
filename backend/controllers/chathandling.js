

export const chathandling = async(req,res) => {
    const {chats} = req.body
    if(!chats) {
        console.error(401, "didn't received user message")
    }

    
}