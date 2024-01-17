import {ObjectId} from "mongodb";

export type Data = {
    locationId: ObjectId,
    datetime: string
    value: number
}