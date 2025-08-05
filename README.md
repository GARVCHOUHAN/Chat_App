# CHAT_APP

A full-stack real-time chat application with file/image/voice upload, AI chatbot, and smart AI suggestions using Cohere.

---

## Features

- Real-time chat (Socket.io)
- File/image and voice message upload
- AI chatbot (Cohere)
- AI smart reply suggestions
- User authentication (JWT)
- Modern React frontend (Vite, Zustand, TailwindCSS)
- MongoDB backend

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB database
- Cohere API key ([get one here](https://dashboard.cohere.com/api-keys))

---

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/CHAT_APP.git
cd CHAT_APP
```

---

### 2. Backend Setup

```sh
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
PORT=3000
MONGO_DB_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
CO_API_KEY=your_cohere_api_key
```

Start the backend:

```sh
npm start
```

---

### 3. Frontend Setup

```sh
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend:

```sh
npm run dev
```

---

## Usage

- Register and login.
- Start a chat with any user.
- Send text, images, or voice messages.
- Use the 🤖 (Ask AI) button to chat with the AI.
- Use the 💡 (AI Suggest) button for smart reply suggestions.

---

## Tech Stack

- **Frontend:** React, Zustand, TailwindCSS, Vite
- **Backend:** Express, MongoDB, Mongoose, Socket.io, Cohere
- **AI:** [Cohere](https://cohere.com/)

---

## License

MIT

---

## Credits

- [Cohere](https://cohere.com/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://mongodb.com/)
- [React](https://react.dev/)
