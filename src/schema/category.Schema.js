import Joi from "joi";

export const createCategorySchema = Joi.object({
    name: Joi.string().required(),
}).required();

export const updateCategorySchema = Joi.object({
    name: Joi.string(),
}).required();