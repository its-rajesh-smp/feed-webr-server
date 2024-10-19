import ENV_VARIABLES from '@common/constants/env.const';
import { v2 as cloudinary } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { getEnv } from './env.util';

/**
 * Configures cloudinary
 */
export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: getEnv(ENV_VARIABLES.CLOUDINARY_CLOUD_NAME),
    api_key: getEnv(ENV_VARIABLES.CLOUDINARY_API_KEY),
    api_secret: getEnv(ENV_VARIABLES.CLOUDINARY_API_SECRET),
    secure: true,
  });
  console.log('Cloudinary Configured');
};

/**
 * Uploads a file to cloudinary
 * @param file File to be uploaded
 * @param folderName  Folder name where the file will be uploaded
 * @returns
 */
export const uploadFile = async (file: FileUpload, folderName?: string) => {
  try {
    if (!file) return;
    const { createReadStream } = file;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );

      createReadStream().pipe(uploadStream);
    });

    return result as {
      secure_url: string;
    };
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
