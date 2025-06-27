export const uploadFile = async(req, res) => {
    try {
        if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
        }
        // Assuming you want to return the file path or some information about the uploaded file
        const filePath = req.file.path;
        return res.status(200).json({ message: "File uploaded successfully", filePath });
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    }

 export const uploadvoice = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Assuming you want to return the file path or some information about the uploaded file
        const filePath = req.file.path;
        return res.status(200).json({ message: "Voice file uploaded successfully", filePath });
    } catch (error) {
        console.error("Error uploading voice file:", error);
        return res.status(500).json({ message: "Internal server error" });
    }  
} 