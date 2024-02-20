import { ObjectId } from "mongodb";

export type DBSource = {
    _id: ObjectId,
    name: string
    url: string
}