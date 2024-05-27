import {ObjectId} from "mongodb";

import {Ingredient} from "../ingredient";

export type DBRecipe = {
    _id: ObjectId,
    name: string
    description: string
    imagePath: string
    ingredients: Ingredient[]
}

