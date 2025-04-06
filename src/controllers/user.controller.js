import {hash,compare} from 'bcrypt';
import userModel from '../models/user.model.js';
import {BaseException} from "../exceptions/base.exception.js";
import { isValidObjectId } from 'mongoose';
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_EXPIRE_TIME, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRE_TIME, REFRESH_TOKEN_SECRET_KEY } from '../config/jwt.config.js';

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

        const accessToken = jwt.sign({id: user.id, role: user.role},ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
            algorithm: "HS256",
        });
        const refreshToken = jwt.sign({id: user.id, role: user.role}, REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
            algorithm: "HS256",
        });

        response.status(200).send({
            message: "User logged in successfully",
            tokens: {
                accessToken,
                refreshToken,
            },
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const refresh = async (request,response,next) => {
    try {
        const {refreshToken} = request.body;

        if (!refreshToken) {
            throw new BaseException("Refresh token is required", 401);
        };

        const data = jwt.verify(refreshToken,REFRESH_TOKEN_SECRET_KEY);
        if (!data) {
            throw new BaseException("Invalid refresh token", 401);
        };
        const newAccessToken = jwt.sign({id: data.id, role: data.role}, ACCESS_TOKEN_SECRET_KEY,{
            expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
            algorithm: "HS256",
        });
        const newRefreshToken = jwt.sign({id: data.id, role: data.role}, REFRESH_TOKEN_SECRET_KEY,{
            expiresIn: REFRESH_TOKEN_SECRET_KEY,
            algorithm: "HS256",
        });
        response.status(200).send({
            message: "Access token refreshed successfully",
            tokens: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            },
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(BaseException("Invalid refresh token", 401));
        } else if (error instanceof jwt.TokenExpiredError) {
            next(BaseException("Refresh token expired", 401));
        } else if (error instanceof jwt.NotBeforeError) {
            next(BaseException("Refresh token not valid before", 401));
        } else {
            next(error);
        }
    }

}

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

export default {registerUser, loginUser,refresh,getAllUsers, getUserById, updateUser, deleteUser};