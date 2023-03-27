import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import videosRoutes from './routes/videos'
import createHttpError,{isHttpError} from "http-errors";


const app = express();

app.use(express.json());


app.use("/api",videosRoutes);

app.use((req:Request,res:Response,next:NextFunction) => {
    next(createHttpError(404,'Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown,req:Request,res:Response,next:NextFunction) => {
    console.log(error);
    let errorMessage = "An unknown err occured";
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error:errorMessage});
})

export default app;