import { S3Client, PutObjectCommand,GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from 'uuid';

const s3 = new S3Client({});
const BUCKET = process.env.BUCKET;



interface UploadResponse {
    key: string,
    error?: any
}

export const uploadToS3 = async({file}: any): Promise<UploadResponse> => {
    const key = `${uuid()}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimeType
    });
    try {
        await s3.send(command);
        return { key };
    } catch (error) {
        console.log(error);
        return { key, error };
    }
}


const getVideoKey = async() => {
    const command = new ListObjectsV2Command({
        Bucket:BUCKET
    });
    const {Contents = []} = await s3.send(command);

    return Contents.map((video) => video.Key);
}

export const getPreSignedUrls = async() => {
    try{
        const videoKeys = await getVideoKey();

        const preSignedUrls = await Promise.all(videoKeys.map((key) => {
            const command = new GetObjectCommand({
                Bucket:BUCKET,
                Key:key
            });
            return getSignedUrl(s3,command,{expiresIn:900})
        }));
        return {preSignedUrls}
    }catch(error){
        console.log(error);
        return {error};
    }
}