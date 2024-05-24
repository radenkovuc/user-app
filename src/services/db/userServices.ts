import {ObjectId} from "mongodb";

import {DBUser} from "@/domain/db/user";

import {connectToDatabase} from "./dbServices";

export const findUserByEmail = async (email: string,): Promise<DBUser | null> => {
    const client = await connectToDatabase()
    const user: DBUser | null = await client.db().collection<DBUser>("user").findOne({email: email})

    void client.close()

    return user
}

export const saveUser = async (email: string, password: string): Promise<void> => {
    const client = await connectToDatabase()
    await client.db().collection<DBUser>("user").insertOne({
        _id: new ObjectId(),
        email,
        password
    })
    void client.close()
}
