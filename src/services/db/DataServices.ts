"use server"

import {ObjectId} from "mongodb";

import {DailyData, Data, Location, Source} from "@/domain";
import {DBData, DBLocation} from "@/domain/db";

import {getSourceDataFromUrl} from "@/services";
import {mapData} from "@/mappers";

import {connectToDatabase} from "./dbServices";

export const getData = async (id: string): Promise<Data[]> => {
    const client = await connectToDatabase()
    const dbData: Data[] = await client.db().collection<DBData>("data").find({sourceId: new ObjectId(id)}, {sort: [["datetime", "asc"]]})
        .map(d => mapData(d)).toArray()

    void client.close()

    return dbData
}

export const updateLocationData = async (location: Location): Promise<{ new: number, old: number }> => {
    const temperatureData = await updateSourceData(location.temperature)
    const waterLevelData = await updateSourceData(location.waterLevel)
    return {
        new: temperatureData.new + waterLevelData.new,
        old: temperatureData.old + waterLevelData.old
    }
}

const updateSourceData = async (source: Source): Promise<{ new: number, old: number }> => {
    const client = await connectToDatabase()
    const db = client.db()
    const dbData: Data[] = await db.collection<DBData>("data").find({sourceId: new ObjectId(source.id)}, {sort: [["datetime", "asc"]]})
        .map(d => mapData(d)).toArray()

    let newData = await getSourceDataFromUrl(source)
    newData = newData.filter(d => !dbData.some(db => db.datetime == d.datetime))

    if (newData.length) {
        await db.collection<DBData>("data").insertMany(newData)
    }

    void client.close()

    return {
        new: newData.length,
        old: dbData.length
    }
}

export const getSourceDataByDate = async (id: string): Promise<DailyData[]> => {
    const client = await connectToDatabase()
    let sources: DailyData[] = await client.db().collection<DBLocation>("data").aggregate<DailyData>([
        {
            $addFields: {
                datetime: {$toDate: "$datetime"} // Convert the date field from string to date type
            }
        },
        {
            $match: {
                sourceId: new ObjectId(id),
                value: {$gt: -1000},
            }
        },
        {
            $group: {
                _id: {$dateToString: {format: "%Y-%m-%d", date: "$datetime"}},
                max_value: {$max: "$value"},
                min_value: {$min: "$value"}
            }
        },
        {
            $project: {
                date: "$_id",
                max_value: 1,
                min_value: 1
            }
        },
        {
            $sort: {"date": 1} // Sort the results by date
        }
    ]).toArray()
    void client.close()

    return sources;
}