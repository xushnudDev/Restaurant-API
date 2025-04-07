import mongoose from 'mongoose';
import { BaseException } from '../exceptions/base.exception.js';
import categoryModel from '../models/category.model.js';



export const getAllCategories = async (request, response, next) => {
    try {
        const categories = await categoryModel.find().populate("meals");
        response.status(200).send({
            message: "success",
            data: categories,
        });
    } catch (error) {
        next(new BaseException('error getting categories', 500));
    }
};

export const getCategoryById = async (request, response, next) => {
    try {
        const { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BaseException("Invalid category ID", 400);
        }
        const category = await categoryModel.findById(id).populate("meals");
        if (!category) {
            throw new BaseException("Category not found", 404);
        }
        response.status(200).send({
            message: "success",
            data: category,
        });
    } catch (error) {
        next(new BaseException('error getting category', 500));
    }
};

export const createCategory = async (request, response, next) => {
    try {
        const { name } = request.body;
        if (!name) {
            throw new BaseException("Missing required field", 400);
        };
        const categoryExists = await categoryModel.findOne({ name });
        if (categoryExists) {
            throw new BaseException("Category already exists", 409);
        };
        const newCategory = new categoryModel({ name });
        await newCategory.save();
        response.status(201).send({
            message: "success",
            data: newCategory,
        });
    } catch (error) {
        next(new BaseException('error creating category', 500));
    }
};

export const updateCategory = async (request, response, next) => {
    try {
        const { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BaseException("Invalid category ID", 400);
        };
        const { name } = request.body;
        if (!name) {
            throw new BaseException("No data to update", 400);
        };
        const category = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) {
            throw new BaseException("Category not found", 404);
        };
        response.status(200).send({
            message: "success",
            data: category,
        });
    } catch (error) {
        next(new BaseException('error updating category', 500));
    }
};

export const deleteCategory = async (request, response, next) => {
    try {
        const { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BaseException("Invalid category ID", 400);
        };
        const category = await categoryModel.findByIdAndDelete(id);
        if (!category) {
            throw new BaseException("Category not found", 404);
        };
        response.status(200).send({
            message: "success",
            data: category,
        });
    } catch (error) {
        next(new BaseException('error deleting category', 500));
    }
};

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};