import {ObjectId} from "mongodb";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";

import {connectToDatabase} from "@/src/services/db";

const getData = (scriptText: string): Data[] => {
    // Regular expression to extract the date-time and numerical values from niz.push lines
    const nizPushRegex = /niz\.push\(\['(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})',\s*(-?\d+(\.\d+)?)\]\);/g;

    // Extracting the date-time and numerical values using the regular expression
    // @ts-ignore
    const matches = [...scriptText.matchAll(nizPushRegex)];

    if (matches.length > 0) {
        // Extracted data
        return matches.map(match => ({
            datetime: match[1],
            value: parseFloat(match[2])
        }))
    } else {
        console.error('Failed to extract data from the niz.push lines in the HTML text.');
        return []
    }
}

export const getLocationData = async (url: string): Promise<Data[]> => {
    const dataRaw = await fetch(url)
    const body = await dataRaw.text()

    return getData(body)
}

export const getLocation = async (id: string): Promise<Location | null> => {
    const client = await connectToDatabase()
    const db = client.db()
    return await db.collection("location").findOne<Location>({"_id": new ObjectId(id)})
}

export const getLocations = async () => {
    const client = await connectToDatabase()
    const db = client.db()

    let locations: Location[] = await db.collection<Location>("location").find().map(l => ({
        id: l._id.toString(),
        name: l.name,
        url: l.url
    })).toArray()
    void client.close()

    return locations;
}