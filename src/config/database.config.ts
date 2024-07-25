import { Inject, Injectable } from "@nestjs/common";
import { ConfigType, registerAs } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";


export const dbEnv =  registerAs("database", () => ({
    DB_URI: process.env.DB_URI,
    DB_NAME: process.env.DB_NAME
}))




@Injectable()
export class DatabaseConfig implements MongooseOptionsFactory  {
    constructor(@Inject(dbEnv.KEY) private dbConfig: ConfigType<typeof dbEnv>){}
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        return {
            uri: this.dbConfig.DB_URI
        }
    }
}