import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { getPreSignedUrls, uploadToS3 } from "../utils/s3";


export const postVideo : RequestHandler = (req,res,next) => {
    const {file} = req;
    try{
        if(!file){
            throw createHttpError(400,'Video file must be sent')
        }
        const {error,key}:any = uploadToS3({file});

        if(error){
            return res.status(500).json({message:error.message})
        }
        return res.status(200).json({key});
    }catch(error){
        next(error)
    }
}

export const getVidoes: RequestHandler = async(req,res,next) => {
    try{
        const {error,preSignedUrls}:any = await getPreSignedUrls();
        if(error){
            return res.status(400).json({message:error.message})
        }
        return res.json(preSignedUrls)
    }catch(error){
        next(error);
    }
}