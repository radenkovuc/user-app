import {ObjectId} from "mongodb";

export type DBData = {
    sourceId: ObjectId,
    datetime: string
    value: number
}
