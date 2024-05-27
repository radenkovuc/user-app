import {ObjectId} from "mongodb";

export type Ingredient = {
    _id: ObjectId,
    name: string
    amount: number
}

