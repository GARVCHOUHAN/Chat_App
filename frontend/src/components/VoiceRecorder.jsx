import React, { useState, useRef } from "react";
import axios from "axios";

const VoiceRecorder = ({ onSend }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new window.MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const file = new File([blob], "voice.webm", { type: "audio/webm" });
      const formData = new FormData();
      formData.append("voice", file);

      const user = JSON.parse(localStorage.getItem("ChatApp"));
      const token = user?.token;
      const res = await axios.post(
        `/api/upload/voice`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.filePath) {
        onSend(res.data.filePath);
      }
      chunks.current = [];
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <span>
      {!recording ? (
        <button type="button" onClick={startRecording}>🎤</button>
      ) : (
        <button type="button" onClick={stopRecording}>⏹️</button>
      )}
    </span>
  );
};

export default VoiceRecorder;