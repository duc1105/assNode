import Category from "../models/category";
import Products from "../models/products";
export const addCate = async(req,res) =>{
    try {
        const category = await Category.create(req.body)
        return res.json(category)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const getAllCate = async(req,res) =>{
    try {
        const category = await Category.find()
        return res.json(category)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const UpdateCate = async(req,res) =>{
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,req.body)
        return res.json(category)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const deleteCate = async(req,res) =>{
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        return res.json(category)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const getCate = async(req,res) =>{
    try {
        const category = await Category.findById(req.params.id)
        const products = await Products.find({categoryId: req.params.id})
        return res.json({...category.toObject(),products})
        
    }
     catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}