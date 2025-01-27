"use server"

import {ObjectId} from "mongodb";

import {Location, LocationData} from "@/domain";
import {DBLocation, DBLocationData} from "@/domain/db";
import {mapLocation, mapLocationData} from "@/mappers";

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

export const getLocationData = async (id: string): Promise<LocationData | undefined> => {
    const client = await connectToDatabase()
    const location = await client.db().collection<DBLocationData>("location-data").findOne({"_id": new ObjectId(id)})
    void client.close()

    if (!location) {
        return undefined
    }

    return mapLocationData(location)
}

export const getLocations = async (): Promise<Location[]> => {
    const client = await connectToDatabase()
    let locations: Location[] = await client.db().collection<DBLocation>("location").find()
        .map(l => mapLocation(l)).toArray()

    void client.close()

    return locations;
}
