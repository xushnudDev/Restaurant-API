import Joi from "joi";

export const createMealSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
}).required()

export const updateMealSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
}).required()