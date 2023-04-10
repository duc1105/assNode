import cloudinary from "../config/upload"

export const UploadImage = async (req, res) => {
    try {
      if (!Array.isArray(req.files)) {
        return res.status(400).json({ message: "anh kp 1 mang" });
      }
      const uploaded = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path);
      });
      const result = await Promise.all(uploaded);
      const uploadedFiles = result.map((file) => ({
        url: file.secure_url,
        id: file.public_id,
      }));
      console.log(uploadedFiles);
      return res.json(uploadedFiles);
    } catch (error) {
      console.log(error);
    }
  };