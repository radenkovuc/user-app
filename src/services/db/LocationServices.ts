"use server"

import {ObjectId} from "mongodb";

import {Location} from "@/src/domain";
import {DBLocation} from "@/src/domain/db";
import {mapLocation} from "@/src/mappers";

import {connectToDatabase} from "./dbServices";

export const getLocation = async (id: string): Promise<Location | null> => {
    const client = await connectToDatabase()
    const location = await client.db().collection<DBLocation>("location").findOne({"_id": new ObjectId(id)})
    void client.close()

    if (!location) {
        return null
    }

    return mapLocation(location)
}

export const getLocations = async (): Promise<Location[]> => {
    const client = await connectToDatabase()
    let locations: Location[] = await client.db().collection<DBLocation>("location").find()
        .map(l => mapLocation(l)).toArray()

    void client.close()

    return locations;
}

export const addLocation = async (name: string, temperatureUrl: string, waterLevelUrl: string): Promise<void> => {
    const client = await connectToDatabase()
    await client.db().collection<DBLocation>("location").insertOne({
        _id: new ObjectId(),
        name,
        temperature: {_id: new ObjectId(), url: temperatureUrl},
        waterLevel: {_id: new ObjectId(), url: waterLevelUrl}
    })
    void client.close()
}