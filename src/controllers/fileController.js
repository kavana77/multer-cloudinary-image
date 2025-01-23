import { cloudinaryupload } from "../service/fileService.js";

export const fileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: { description: "No file uploaded." } });
    }

    const file = req.file[0];

    const response = await cloudinaryupload(file);

    return res.status(200).json({ message: "File uploaded successfully", uploadResult: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
