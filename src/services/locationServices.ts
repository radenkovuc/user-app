import {ObjectId} from "mongodb";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";

import {connectToDatabase} from "@/src/services/db";

const getData = (scriptText: string, locationId: ObjectId): Data[] => {
    // Regular expression to extract the date-time and numerical values from niz.push lines
    const nizPushRegex = /niz\.push\(\['(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})',\s*(-?\d+(\.\d+)?)\]\);/g;

    // Extracting the date-time and numerical values using the regular expression
    // @ts-ignore
    const matches = [...scriptText.matchAll(nizPushRegex)];

    if (matches.length > 0) {
        // Extracted data
        return matches.map(match => ({
            datetime: match[1],
            value: parseFloat(match[2]),
            locationId
        }))
    } else {
        console.error('Failed to extract data from the niz.push lines in the HTML text.');
        return []
    }
}

export const getLocationData = async (location: Location): Promise<Data[]> => {
    const client = await connectToDatabase()
    const db = client.db()
    const dbData: Data[] = await db.collection<Data>("data").find({locationId: location._id}, {sort: [["datetime", "desc"]]}).toArray()

    let newData = await getLocationDataFromUrl(location)
    newData = newData.filter(d => !dbData.some(db => db.datetime == d.datetime))

    if (newData.length) {
        console.log("newData", newData)

        await db.collection<Data>("data").insertMany(newData)
    }

    void client.close()

    return [...newData, ...dbData]
}

export const getLocationDataFromUrl = async (location: Location): Promise<Data[]> => {
    const dataRaw = await fetch(location.url)
    const body = await dataRaw.text()

    return getData(body, location._id)
}

export const getLocation = async (id: string): Promise<Location | null> => {
    const client = await connectToDatabase()
    const db = client.db()
    const location = await db.collection("location").findOne<Location>({"_id": new ObjectId(id)})
    void client.close()

    return location

}

export const getLocations = async () => {
    const client = await connectToDatabase()
    const db = client.db()

    let locations: Location[] = await db.collection<Location>("location").find().toArray()
    void client.close()

    return locations;
}