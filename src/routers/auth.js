import express from "express";
import { getUser, singin, singup } from "../controllers/auth.js";

const router = express.Router();
router.get("/getuser", getUser)
router.post("/signup", singup)
router.post("/signin", singin)

export default router