import { v2 as cloudinary } from "cloudinary";
import { config as dotenvConfig } from "dotenv";
import { Provider } from '@nestjs/common';

dotenvConfig(); // Esto cargará las variables de entorno desde el archivo .env por defecto

export const CloudinaryConfig: Provider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
