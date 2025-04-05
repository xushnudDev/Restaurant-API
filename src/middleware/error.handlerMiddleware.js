export const errorHandlerMiddleware = (error,_,res,__) => {
    if (error.isException) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    };
    res.status(500).json({
        message: "Internal Server Error"
    });
}