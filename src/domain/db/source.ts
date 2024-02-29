import { ObjectId } from "mongodb";

export type DBSource = {
    _id: ObjectId,
    url: string
}