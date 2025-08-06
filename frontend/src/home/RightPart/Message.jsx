import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser._id;
  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  // Detect file/voice by extension
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(message.message);
  const isAudio = /\.(webm|mp3|wav|ogg)$/i.test(message.message);

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {isImage ? (
              <img src={`/${message.message}`} alt="sent" style={{ maxWidth: 200 }} />
            ) : isAudio ? (
              <audio controls src={`/${message.message}`}></audio>
            ) : (
              message.message
            )}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;