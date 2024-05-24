import {ObjectId} from "mongodb";

export type DBUser = {
    _id: ObjectId,
    email: string,
    password: string
}
