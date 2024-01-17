import { ObjectId } from "mongodb";

export type Location = {
    _id: ObjectId,
    name: string
    url: string
}