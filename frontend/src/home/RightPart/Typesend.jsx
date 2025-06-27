
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import FileUploader from "../../components/FileUploader";
import VoiceRecorder from "../../components/VoiceRecorder";
import axios from "axios";

function Typesend() {
  const [message, setMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const { loading, sendMessages } = useSendMessage();

  // Send text message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessages(message);
      setMessage("");
    }
  };

  // Send image message
  const handleImageUpload = async (filePath) => {
    await sendMessages(filePath);
  };

  // Send voice message
  const handleVoiceSend = async (filePath) => {
    await sendMessages(filePath);
  };

  // AI Chatbot
  const handleAIChat = async () => {
    setAiLoading(true);
    const user = JSON.parse(localStorage.getItem("ChatApp"));
    const token = user?.token;
    const selectedConversation = JSON.parse(sessionStorage.getItem("selectedConversation"));
    const receiverId = selectedConversation?._id;
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/ai/chat`,
      { prompt: message, receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await sendMessages(res.data.aiResponse);
    setAiLoading(false);
  };

  // AI Suggestion
  const handleAISuggest = async () => {
    setAiLoading(true);
    const user = JSON.parse(localStorage.getItem("ChatApp"));
    const token = user?.token;
    const selectedConversation = JSON.parse(sessionStorage.getItem("selectedConversation"));
    const receiverId = selectedConversation?._id;
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/ai/suggest`,
      { receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessage(res.data.suggestion);
    setAiLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] bg-gray-800">
        <div className="w-[60%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-[1px] border-gray-700 flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900 mt-1"
          />
        </div>
        <FileUploader onUploadComplete={handleImageUpload} />
        <VoiceRecorder onSend={handleVoiceSend} />
        <button type="submit" disabled={loading || aiLoading}>
          <IoSend className="text-3xl" />
        </button>
        <button type="button" onClick={handleAIChat} disabled={aiLoading}>
          🤖(Ask AI)
        </button>
        <button type="button" onClick={handleAISuggest} disabled={aiLoading}>
          💡(AI Suggest)
        </button>
      </div>
    </form>
  );
}

export default Typesend;