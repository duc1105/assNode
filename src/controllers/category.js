import dotenv from "dotenv";
import joi from "joi";
import Category from "../models/category";
import Product from "../models/products";

dotenv.config();
const categorySchema = joi.object({
    name: joi.string().required(),
});

export const getAllCate = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            return res.json({
                message: "Không có danh mục nào",
            });
        }
        return res.json(categories);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const getCate = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id)
        const products = await Product.find({ categoryId: req.params.id });

        
        if (!category) {
            return res.json({
                message: "Không có danh mục nào",
            });
        }
        return res.json({ ...category.toObject(), products });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const addCate = async function (req, res) {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }
        const category = await Category.create(req.body);
        if (!category) {
            return res.json({
                message: "Không thêm được danh mục",
            });
        }
        return res.json({
            message: "Thêm danh mục thành công",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const UpdateCate = async function (req, res) {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.json({
                message: "Cập nhật danh mục không thành công",
            });
        }
        return res.json({
            message: "Cập nhật danh mục thành công",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const deleteCate = async function (req, res) {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa danh mục thành công",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};