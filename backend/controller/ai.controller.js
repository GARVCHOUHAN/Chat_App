// import OpenAI from "openai";
// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";



// export const aiChat = async (req, res) => {
//   try {
//     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     const { prompt, receiverId } = req.body;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       members: { $all: [senderId, receiverId] },
//     }).populate("messages");

//     let history = "";
//     if (conversation) {
//       history = conversation.messages
//         .map(
//           (msg) =>
//             `${msg.senderId.toString() === senderId.toString() ? "You" : "Them"}: ${msg.message}`
//         )
//         .join("\n");
//     }

//     const aiPrompt = `Here is the past conversation:\n${history}\n\nUser: ${prompt}\nAI:`;

//     const completion = await openai.completions.create({
//       model: "gpt-3.5-turbo-instruct",
//       prompt: aiPrompt,
//       max_tokens: 150,
//       temperature: 0.7,
//     });

//     const aiResponse = completion.choices[0].text.trim();
//     res.json({ aiResponse });
//   } catch (error) {
//     console.error("AI Chat error:", error);
//     res.status(500).json({ error: "AI error" });
//   }
// };

// export const aiSuggest = async (req, res) => {
//   try {
//     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     const { receiverId } = req.body;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       members: { $all: [senderId, receiverId] },
//     }).populate("messages");

//     let history = "";
//     if (conversation) {
//       history = conversation.messages
//         .map(
//           (msg) =>
//             `${msg.senderId.toString() === senderId.toString() ? "You" : "Them"}: ${msg.message}`
//         )
//         .join("\n");
//     }

//     const aiPrompt = `Based on this conversation, suggest a smart reply:\n${history}\nAI:`;

//     const completion = await openai.completions.create({
//   model: "gpt-3.5-turbo-instruct",
//   prompt: aiPrompt,
//   max_tokens: 150,
//   temperature: 0.7,
// });

//     const suggestion = completion.choices[0].text.trim();
//     res.json({ suggestion });
//   } catch (error) {
//     console.error("AI Suggest error:", error);
//     res.status(500).json({ error: "AI error" });
//   }
// };

import { CohereClient } from "cohere-ai";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const cohere = new CohereClient({ apiKey: process.env.CO_API_KEY });

// 📌 AI Chat Response
export const aiChat = async (req, res) => {
  try {
    const { prompt, receiverId } = req.body;
    const senderId = req.user._id;

    // Fetch conversation history
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    let history = "";
    if (conversation) {
      history = conversation.messages
        .map(
          (msg) =>
            `${msg.senderId.toString() === senderId.toString() ? "You" : "Them"}: ${msg.message}`
        )
        .join("\n");
    }

    const fullPrompt = `This is a conversation:\n${history}\n\nUser: ${prompt}\nAI:`;

    // Call Cohere's generate endpoint
    const response = await cohere.generate({
      model: "command",
      prompt: fullPrompt,
      maxTokens: 150,
      temperature: 0.7,
    });

    const aiResponse = response.generations[0].text.trim();
    res.json({ aiResponse });
  } catch (error) {
    console.error("AI Chat error (Cohere):", error);
    res.status(500).json({ error: "AI error" });
  }
};

// 📌 AI Smart Suggestion
export const aiSuggest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user._id;

    // Fetch conversation history
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    let history = "";
    if (conversation) {
      history = conversation.messages
        .map(
          (msg) =>
            `${msg.senderId.toString() === senderId.toString() ? "You" : "Them"}: ${msg.message}`
        )
        .join("\n");
    }

    const aiPrompt = `Based on this chat history, suggest a smart and friendly reply:\n${history}\nReply:`;

    // Call Cohere's generate endpoint
    const response = await cohere.generate({
      model: "command",
      prompt: aiPrompt,
      maxTokens: 80,
      temperature: 0.7,
    });

    const suggestion = response.generations[0].text.trim();
    res.json({ suggestion });
  } catch (error) {
    console.error("AI Suggest error (Cohere):", error);
    res.status(500).json({ error: "AI error" });
  }
};