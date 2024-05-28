import React, { useState } from 'react';
import { useQuery } from "react-query";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );
      return response.data;
    // if (input.trim()) {
    //   const userMessage = { sender: 'user', text: input };
    //   setMessages([...messages, userMessage]);
    //   setInput('');

    //   // Simulate a response from the bot
    //   const botMessage = { sender: 'bot', text: 'This is a response from the bot.' };
    //   setMessages((prevMessages) => [...prevMessages, botMessage]);
    // }


  };


  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}
          >
            {msg.text}
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
