"use server"

import {ObjectId} from "mongodb";

import {DailyData, Data, Location, LocationData, Source} from "@/domain";
import {DBData, DBLocationData} from "@/domain/db";

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

export const updateLocationData = async (location: Location): Promise<number> => {
    const t1 = Date.now()
    const temperatureData = await updateSourceData(location.temperature)
    const waterLevelData = await updateSourceData(location.waterLevel)
    const t2 = Date.now()
    console.log("Update", t2 - t1)
    const temperatureDataByDate: DailyData[] = await getSourceDataByDate(location.temperature.id)
    const waterLevelDataByDate: DailyData[] = await getSourceDataByDate(location.waterLevel.id)
    const t3 = Date.now()
    console.log("load", t3 - t2)

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

    const client = await connectToDatabase();
    try {
        await client.db()
            .collection<DBLocationData>("location-data")
            .replaceOne({_id: new ObjectId(location.id)}, locationData, {upsert: true});
    } finally {
        await client.close(); // Ensure the client is closed properly
    }
    const t4 = Date.now()
    console.log("Total", t4 - t1)
    return t4 - t1//temperatureData.dbData.length + waterLevelData.dbData.length
}

const updateSourceData = async (source: Source): Promise<{ newData: Data[], dbData: Data[], lastData: Data[] }> => {
    const lastData = await getSourceDataFromUrl(source)
    const oldestDateTime = new Date(lastData[0].datetime.replace(" ", "T"))

    const client = await connectToDatabase()
    const db = client.db()
    const dbData: Data[] = await db.collection<DBData>("data").find({
        sourceId: new ObjectId(source.id),
        datetime: {$gt: oldestDateTime}
    }, {sort: [["datetime", "asc"]]})
        .map(d => mapData(d)).toArray()
    console.log('oldestDateTime',oldestDateTime)
    console.log('dbData', dbData.length)
    const newData = lastData.filter(d => !dbData.some(db => db.datetime == d.datetime))
    console.log('newData', newData.length)

    // if (newData.length) {
    //     await db.collection<DBData>("data").insertMany(lastData.map(data => mapDBData(data, source.id)))
    // }

    void client.close()

    return {
        lastData,
        newData,
        dbData
    }
}

export const getSourceDataByDate = async (id: string): Promise<DailyData[]> => {
    const client = await connectToDatabase()
    let sources: DailyData[] = await client.db().collection<DBData>("data").aggregate<DailyData>([
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
