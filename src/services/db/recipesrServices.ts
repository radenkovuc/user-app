"use server"

import {ObjectId} from "mongodb";

import {Recipe} from "@/domain";
import {DBRecipe} from "@/domain/db";

import {connectToDatabase} from "./dbServices";

export const getRecipes = async (): Promise<Recipe[]> => {
    const client = await connectToDatabase()
    let recipes: Recipe[] = await client.db().collection<DBRecipe>("recipe").find()
        .map(r => ({
            id: r._id.toString(),
            name: r.name,
            description: r.description,
            imagePath: r.imagePath,
            ingredients: r.ingredients,
        })).toArray()

    void client.close()

    return recipes;
}

export const updateRecipes = async (recipes: Recipe[]): Promise<void> => {
    const client = await connectToDatabase()
    for (const recipe of recipes) {
        const collection = client.db().collection<DBRecipe>("recipe")
        if (recipe.id) {
            await collection.replaceOne({"_id": new ObjectId(recipe.id)}, {
                name: recipe.name,
                description: recipe.description,
                imagePath: recipe.imagePath,
                ingredients: recipe.ingredients,
            })
        } else {
            await collection.insertOne({_id: new ObjectId(), ...recipe})
        }
    }

    void client.close()
}
