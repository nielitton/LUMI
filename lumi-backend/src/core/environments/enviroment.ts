import { configDotenv } from "dotenv";

configDotenv()

export const APP_PORT = process.env.APP_PORT || 3333
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || ''
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ''
export const AWS_REGION = process.env.AWS_REGION || ''
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || ''