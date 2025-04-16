const errorMiddleware = (err, req, res, next) => {
    try {
        const error = {...err};
        error.message = err.message;

        //mongoose bad objectId error
        if(err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error.statusCode = 404;
            error.message = message;
        };

        //mongoose duplicate key error
        if(err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error.statusCode = 400;
            error.message = message;
        };
        //mongoose validation error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        };

        res.status(error.statusCode || 500).json({success: false, message: error.message || 'Internal Server Error'});

    } catch (error) {
        next(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export default errorMiddleware;