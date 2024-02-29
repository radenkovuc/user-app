import {ObjectId} from "mongodb";

import {DBSource} from "./source";

export type DBLocation = {
    _id: ObjectId,
    name: string
    temperature: DBSource
    waterLevel: DBSource
}