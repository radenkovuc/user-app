import {ObjectId} from "mongodb";

export type DBData = {
    locationId: ObjectId,
    datetime: string
    value: number
}