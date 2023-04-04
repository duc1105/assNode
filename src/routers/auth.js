import express from "express";
import { getUser, singin, singup } from "../controllers/auth.js";

const router = express.Router();
router.get("/getuser", getUser)
router.post("/singup", singup)
router.post("/singin", singin)

export default router