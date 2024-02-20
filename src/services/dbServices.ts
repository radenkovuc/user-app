"use server"

import {MongoClient, ObjectId} from "mongodb";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";
import {DailyData} from "@/src/domain/dailyData";
import {DBData} from "@/src/domain/db/data";
import {DBLocation} from "@/src/domain/db/location";
import {Source} from "@/src/domain/source";
import {DBSource} from "@/src/domain/db/source";
import {getSourceDataFromUrl} from "@/src/services/locationServices";
import {mapData, mapSource} from "@/src/mappers/dbDataMapper";


export const connectToDatabase = async (): Promise<MongoClient> => {
    return await MongoClient.connect(process.env.MONGODB_URI || "");
}

export const getSourceData = async (id: string): Promise<Data[]> => {
    const client = await connectToDatabase()
    const db = client.db()
    const dbData: Data[] = await db.collection<DBData>("data").find({sourceId: new ObjectId(id)}, {sort: [["datetime", "asc"]]})
        .map(d => mapData(d)).toArray()

    void client.close()

    return dbData
}

export const updateSourceData = async (source: Source): Promise<{ new: number, old: number }> => {
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

export const getSource = async (id: string): Promise<Source | null> => {
    const client = await connectToDatabase()
    const db = client.db()
    const source = await db.collection<DBSource>("source").findOne({"_id": new ObjectId(id)})
    void client.close()

    if (!source) {
        return null
    }

    return mapSource(source)

}

export const getSources = async (): Promise<Source[]> => {
    const client = await connectToDatabase()
    let source: Location[] = await client.db().collection<DBSource>("source").find()
        .map(l => mapSource(l)).toArray()

    void client.close()

    return source;
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