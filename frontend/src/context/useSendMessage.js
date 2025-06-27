import React, { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("ChatApp"));
      const token = user?.token;
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/send/${selectedConversation._id}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage([...messages, res.data]);
    } catch (error) {
      console.log("Error in send messages", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;