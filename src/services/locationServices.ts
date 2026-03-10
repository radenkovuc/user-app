'use server'

import {ObjectId} from "mongodb";

import {Source} from "@/domain";
import {DBData} from "@/domain/db";

const getData = (scriptText: string, sourceId: string): DBData[] => {
    // Regular expression to extract the date-time and numerical values from niz.push lines
    const nizPushRegex = /niz\.push\(\['(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})',\s*(-?\d+(\.\d+)?)\]\);/g;

    // Extracting the date-time and numerical values using the regular expression
    // @ts-ignore
    const matches = [...scriptText.matchAll(nizPushRegex)];

    if (matches.length > 0) {
        // Extracted data
        return matches.map(match => ({
            datetime: new Date(match[1].replace(" ", "T")),
            value: parseFloat(match[2]),
            sourceId: new ObjectId(sourceId)
        })).sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
    } else {
        console.error('Failed to extract data from the niz.push lines in the HTML text.');
        return []
    }
}

const getNewWayData = (scriptText: string, sourceId: string): DBData[] => {
    const regex = /\["(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})",\s*(-?\d+(?:\.\d+)?)\]/g;

    const matches = Array.from(scriptText.matchAll(regex));

    if (!matches.length) {
        console.error("No data found in scriptText");
        return [];
    }

    return matches
        .map(m => ({
            datetime: new Date(m[1].replace(" ", "T")),
            value: parseFloat(m[2]),
            sourceId: new ObjectId(sourceId)
        }))
        .sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
}

export const getSourceDataFromUrl = async (source: Source): Promise<DBData[]> => {
    if (!source.url) {
        return []
    }

    const dataRaw = await fetch(source.url, {cache: "no-cache"})
    const body = await dataRaw.text()

    let data: DBData[] = getData(body, source.id)
    if (data === null || data.length === 0) {
        data = getNewWayData(body, source.id)
    }

    return data

}
