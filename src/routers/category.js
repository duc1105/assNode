import express  from "express";
import { UpdateCate, addCate, deleteCate, getAllCate, getCate } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";


const router = express.Router();
 
router.get('/category',getAllCate)
router.get('/category/:id',getCate)
router.post('/category',checkPermission,addCate)
router.patch('/category/:id',checkPermission,UpdateCate)
router.delete('/category/:id',checkPermission,deleteCate)

export default router