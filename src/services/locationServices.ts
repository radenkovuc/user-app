import {ObjectId} from "mongodb";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";
import {DBData} from "@/src/domain/db/data";

const getData = (scriptText: string, locationId: string): DBData[] => {
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
            locationId: new ObjectId(locationId)
        }))
    } else {
        console.error('Failed to extract data from the niz.push lines in the HTML text.');
        return []
    }
}

export const getLocationDataFromUrl = async (location: Location): Promise<DBData[]> => {
    const dataRaw = await fetch(location.url, {cache: "no-cache"})
    const body = await dataRaw.text()

    return getData(body, location.id)
}
