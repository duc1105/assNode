import express from "express";
import multer from "multer";
import { UploadImage } from "../controllers/upload";
const router = express.Router();
const upload = multer({ dest: "uploads/" });
// ADD PRODUCT
router.post("/images", upload.array("image", 5), UploadImage);

// // //UPDATE
// router.put("/images/:id", upload.array("image", 5));

// //DELETE
// router.delete("/images/:id");
export default router;