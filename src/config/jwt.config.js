import { config } from "dotenv";

config();

export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN;
export const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME;
export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN;
export const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME;