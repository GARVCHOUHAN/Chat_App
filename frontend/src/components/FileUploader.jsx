import React, { useState } from "react";
import axios from "axios";

const FileUploader = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const user = JSON.parse(localStorage.getItem("ChatApp"));
      const token = user?.token;
      const res = await axios.post(
        `/api/upload/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.filePath) {
        onUploadComplete(res.data.filePath);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <label>
      📁
      <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
      {uploading && <span>Uploading...</span>}
    </label>
  );
};

export default FileUploader;