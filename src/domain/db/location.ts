import { ObjectId } from "mongodb";

export type DBLocation = {
    _id: ObjectId,
    name: string
    temperatureUrl: string
    highUrl: string
}