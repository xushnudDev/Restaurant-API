import {hash,compare} from 'bcrypt';
import userModel from '../models/user.model.js';
import {BaseException} from "../exceptions/base.exception.js";
import { isValidObjectId } from 'mongoose';

const registerUser = async (request,response,next) => {
    try {
        const {name,email,password,phoneNumber} = request.body;

        if (!name ||!email ||!password ||!phoneNumber) {
            throw new BaseException("All fields are required", 400);
        };

    const foundedUser = await userModel.findOne({ $or: [{ email }, { phoneNumber }] });

    if (foundedUser) {
        throw new BaseException("Email or phone number already exists", 409);
    };

    const hashedPassword = await hash(password,10);

    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
    });

    response.status(201).send({
        message: "User registered successfully",
        user: newUser,
    })
    } catch (error) {
        next(error);
    }
};

const loginUser = async (request,response,next) => {
    try {
        const {email, password} = request.body;

        const user = await userModel.findOne({email});

        if (!user) {
            throw new BaseException("Invalid email or password", 401);
        };

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new BaseException("Invalid email or password", 401);
        };

        response.status(200).send({
            message: "User logged in successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (request, response,next) => {
    try {
        const users = await userModel.find({});
        response.send({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (request, response, next) => {
    try {
        const user = await userModel.findById(request.params.id);

        if (!user) {
            throw new BaseException("User not found", 404);
        };

        response.send({
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (request, response, next) => {
    try {
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            throw new BaseException("Invalid user ID", 400);
        };
        const {name, email, password} = request.body;

        if (!(name && email && password)) {
            throw new BaseException("Email and password are required", 400);
        };

        const user = await userModel.findByIdAndUpdate(id,{

        },{
            new: true,
            runValidators: true,
        });

        response.status(200).send({
            message: "User updated successfully",
            data: user,
        });
        
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (request, response, next) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(request.params.id);

        if (!deletedUser) {
            throw new BaseException("User not found", 404);
        };

        response.send({
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export default {registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser};