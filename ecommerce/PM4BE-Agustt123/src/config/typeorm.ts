import path from "path";
import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";  // Importar dotenvConfig

dotenvConfig({ path: ".development.env" });  // Configurar dotenv

const config = {
  type: "postgres",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],  // Corregido 'migraton'
  autoLoadEntities: true,
  logging: false,  // Corregido 'loggin'
  synchronize: false,
  dropSchema: false,
};

export const typeOrmConfig = registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
