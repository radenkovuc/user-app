import {MongoClient} from "mongodb"

export const connectToDatabase = async (): Promise<MongoClient> => {
    return await MongoClient.connect(process.env.MONGODB_URI || "");
}