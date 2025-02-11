import {ObjectId} from "mongodb";

export type DBData = {
    _id?: ObjectId,
    sourceId: ObjectId,
    datetime: Date
    value: number
}
