"use server"

import {ObjectId} from "mongodb";

import {DailyData, Data, Location, LocationData, Source} from "@/domain";
import {DBData, DBLocation, DBLocationData} from "@/domain/db";

import {getSourceDataFromUrl} from "@/services";
import {mapData, mapDBData} from "@/mappers";

import {connectToDatabase} from "./dbServices";

export const getData = async (id: string): Promise<Data[]> => {
    const client = await connectToDatabase()
    const dbData: Data[] = await client.db().collection<DBData>("data").find({sourceId: new ObjectId(id)}, {sort: [["datetime", "asc"]]})
        .map(d => mapData(d)).toArray()

    void client.close()

    return dbData
}

export const updateLocationData = async (location: Location): Promise<{ new: number, old: number }> => {
    const t1 = Date.now()
    const temperatureData = await updateSourceData(location.temperature)
    const waterLevelData = await updateSourceData(location.waterLevel)

    const temperatureDataByDate: DailyData[] = await getSourceDataByDate(location.temperature.id)
    const waterLevelDataByDate: DailyData[] = await getSourceDataByDate(location.waterLevel.id)

    const locationData: LocationData = {
        temperature: {
            lastData: temperatureData.lastData,
            dailyData: temperatureDataByDate
        },
        waterLevel: {
            lastData: waterLevelData.lastData,
            dailyData: waterLevelDataByDate

        }
    }
    const t2 = Date.now()

    // const client = await connectToDatabase();
    // try {
    //     await client.db()
    //         .collection<DBLocationData>("location-data")
    //         .replaceOne({_id: new ObjectId(location.id)}, locationData, {upsert: true});
    // } finally {
    //     await client.close(); // Ensure the client is closed properly
    // }

    return {
        new: t2 - t1,
        old: temperatureData.dbData.length + waterLevelData.dbData.length
    }
}

const updateSourceData = async (source: Source): Promise<{ newData: Data[], dbData: Data[], lastData: Data[] }> => {
    const client = await connectToDatabase()
    const db = client.db()
    const dbData: Data[] = await db.collection<DBData>("data").find({sourceId: new ObjectId(source.id)}, {sort: [["datetime", "asc"]]})
        .map(d => mapData(d)).toArray()

    const lastData = await getSourceDataFromUrl(source)
    const newData = lastData.filter(d => !dbData.some(db => db.datetime == d.datetime))

    if (newData.length) {
        await db.collection<DBData>("data").insertMany(lastData.map(data => mapDBData(data, source.id)))
    }

    void client.close()

    return {
        lastData,
        newData,
        dbData
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
                min_value: {$min: "$value"},
                avg_value: {$avg: "$value"}
            }
        },
        {
            $addFields: {
                avg_value: {$round: ["$avg_value", 2]} // Round the average value to two decimal places
            }
        },
        {
            $project: {
                date: "$_id",
                max_value: 1,
                min_value: 1,
                avg_value: 1,
            }
        },
        {
            $sort: {"date": 1} // Sort the results by date
        }
    ]).toArray()
    void client.close()

    return sources;
}
