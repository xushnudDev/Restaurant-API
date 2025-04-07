import mealModel from "../models/meal.model.js";
import { BaseException } from "../exceptions/base.exception.js";
import mongoose from "mongoose";
import categoryModel from "../models/category.model.js";

export const getAllMeals = async (request, response, next) => {
    try {
        const { category } = request.query;
        let filter = {};
        if (category) {
            filter.category = category;
        }
        const meals = await mealModel.find(filter).populate("category");
        response.status(200).send({
            message: "success",
            data: meals,
        });
    } catch (error) {
        next(new BaseException('error getting meals', 500));
    }
};


export const getMealById = async (request,response,next) => {
    try {
        const {id} = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BaseException("Invalid meal ID", 400);
        };
        const meal = await mealModel.findById(id).populate("category");
        if (!meal) {
            throw new BaseException("Meal not found", 404);
        };
        response.status(200).send({
            message: "success",
            data: meal,
        })
    } catch (error) {
        next(new BaseException('error getting meal',500));
        
    }
};

export const createMeal = async (request,response,next) => {
    try {
        const {name, price, description, category} = request.body;
        if (!name ||!price ||!description ||!category) {
            throw new BaseException("Missing required fields", 400);
        };
        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            throw new BaseException("Invalid category ID", 400);
        };
        if (isNaN(price)) {
            throw new BaseException("Invalid price", 400);
        }
        const newMeal = new mealModel({ name, price, description, category});
        await newMeal.save();

        await categoryModel.updateOne({_id: category},{
            $push: { meals: newMeal._id },
        });

        const updateCategory = await categoryModel.findById(category).populate("meals");
        response.status(201).send({
            message: "success",
            data: updateCategory,
        })
        
    } catch (error) {
        next(new BaseException('error creating meal',500));
        
    }
};

export const updateMeal = async (request,response,next) => {
    try {
        const {id} = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BaseException("Invalid meal ID", 400);
        };
        const {name, price, description, category} = request.body;
        if (!name &&!price &&!description &&!category) {
            throw new BaseException("No data to update", 400);
        };
        const meal = await mealModel.findById(id);
        if (!meal) {
            throw new BaseException("Meal not found", 404);
        };

        meal.name = name;
        meal.price = price;
        meal.description = description;
        meal.category = category;
        meal.imageUrl = imageUrl;
        await meal.save();
        const updatedCategory = await categoryModel.findById(meal.category).populate('meals');
        response.status(200).send({
            message: "success",
            data: updatedCategory,
        })
    } catch (error) {
        next(new BaseException('error updating meal',500));
    }
};

export const deleteMeal = async (request,response,next) => {
    try {
        const {id} = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BaseException("Invalid meal ID", 400);
        };
        const meal = await mealModel.findByIdAndDelete(id);
        if (!meal) {
            throw new BaseException("Meal not found", 404);
        };
        await categoryModel.updateOne({_id: meal.category},{
            $pull: { meals: meal._id },
        });
        response.status(200).send({
            message: "success",
        })
    } catch (error) {
        next(new BaseException('error deleting meal',500));
    }
};
export default {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
}



