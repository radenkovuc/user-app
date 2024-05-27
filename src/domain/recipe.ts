import {Ingredient} from "./ingredient";

export type Recipe = {
    id: string,
    name: string
    description: string
    imagePath: string
    ingredients: Ingredient[]
}

