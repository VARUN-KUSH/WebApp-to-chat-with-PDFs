import React, { useState } from "react";
//import { useQuery } from "react-query";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setinput] = useState("");

  
  const sendMessage = async () => {
    setinput("")
    const userMessage = {userresponse: input, sender: "user"}
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/chataboutpdf/startquery",
        {chats: input}
       
      );
      const response_message_from_llm = response.data;
      if(!response_message_from_llm) console.error("error getting from server")
      setMessages((prevMessages) => [...prevMessages, response_message_from_llm]);
      
      console.log(response.data)
    } catch (error) {
      console.error("error while requesting server", error)
    }
    
    return;
  };

  const handleInputChange = (event) => {
    setinput(event.target.value);
  };

  

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {msg.userresponse}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
