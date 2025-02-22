"use server"

import {ObjectId} from "mongodb";

import {DailyData, Data, Location, LocationData, Source} from "@/domain";
import {DBData, DBLocationData} from "@/domain/db";

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

export const updateLocationData = async (location: Location): Promise<LocationData> => {
    const temperatureData = await updateSourceData(location.temperature)
    const waterLevelData = await updateSourceData(location.waterLevel)

    const temperatureDataByDate: DailyData[] = await getSourceDataByDate(location.temperature.id)
    const waterLevelDataByDate: DailyData[] = await getSourceDataByDate(location.waterLevel.id)

    const locationData: LocationData = {
        temperature: {
            lastData: temperatureData,
            dailyData: temperatureDataByDate
        },
        waterLevel: {
            lastData: waterLevelData,
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
    return locationData
}

const updateSourceData = async (source: Source): Promise<Data[]> => {
    const data = await getSourceDataFromUrl(source)

    if (data.length > 0) {
        const client = await connectToDatabase()
        const db = client.db()
        const dbData: DBData[] = await db.collection<DBData>("data").find({
            sourceId: new ObjectId(source.id),
            datetime: {$gte: data[0].datetime}
        }, {sort: [["datetime", "asc"]]}).toArray()
        const newData = data.filter(d => !dbData.some(db => db.datetime.getTime() === d.datetime.getTime()))

        if (newData.length) {
            await db.collection<DBData>("data").insertMany(newData)
        }

        void client.close()
    }

    return data.map(d => mapData(d))
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
