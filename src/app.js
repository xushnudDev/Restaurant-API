import express from 'express';
import router from './routes/index.js';
import { errorHandlerMiddleware } from './middleware/error.handlerMiddleware.js';
import {BaseException} from './exceptions/base.exception.js';

const app = express();


app.use(express.json());


app.use("/api",router);

app.get((req, res) => {
    throw new BaseException(`Given ${req.url} with method: ${req.method} not found`, 404)}
);

app.use(errorHandlerMiddleware)
export default app