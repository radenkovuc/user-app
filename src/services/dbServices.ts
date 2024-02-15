"use server"

import {MongoClient, ObjectId} from "mongodb";
import {revalidatePath} from "next/cache";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";
import {DailyData} from "@/src/domain/dailyData";

import {getLocationDataFromUrl} from "@/src/services/locationServices";
import {DBData} from "@/src/domain/db/data";
import {mapData, mapLocation} from "@/src/mappers/dbDataMapper";
import {DBLocation} from "@/src/domain/db/location";

export const connectToDatabase = async (): Promise<MongoClient> => {
    return await MongoClient.connect(process.env.MONGODB_URI || "");
}

export const getLocationData = async (location: Location): Promise<Data[]> => {
    const client = await connectToDatabase()
    const db = client.db()
    const dbData: Data[] = await db.collection<DBData>("data").find({locationId: new ObjectId(location.id)}, {sort: [["datetime", "asc"]]})
        .map(d => mapData(d)).toArray()

    void client.close()

    return dbData
}

export const updateLocationData = async (location: Location): Promise<{ new: number, old: number }> => {
    const client = await connectToDatabase()
    const db = client.db()
    const dbData: Data[] = await db.collection<DBData>("data").find({locationId: new ObjectId(location.id)}, {sort: [["datetime", "asc"]]})
        .map(d => mapData(d)).toArray()

    let newData = await getLocationDataFromUrl(location)
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

export const getLocation = async (id: string): Promise<Location | null> => {
    const client = await connectToDatabase()
    const db = client.db()
    const location = await db.collection<DBLocation>("location").findOne({"_id": new ObjectId(id)})
    void client.close()

    if (!location) {
        return null
    }

    return mapLocation(location)

}

export const getLocations = async (): Promise<Location[]> => {
    const client = await connectToDatabase()
    let locations: Location[] = await client.db().collection<DBLocation>("location").find()
        .map(l => mapLocation(l)).toArray()

    void client.close()

    return locations;
}

export const addLocation = async (name: string, url: string): Promise<void> => {
    const client = await connectToDatabase()
    await client.db().collection<DBLocation>("location").insertOne({_id: new ObjectId(), name, url})
    void client.close()
}

export const deleteLocation = async (id: string): Promise<void> => {
    const client = await connectToDatabase()
    await client.db().collection<Location>("location").findOneAndDelete({"_id": new ObjectId(id)})
    await client.db().collection<DBData>("data").deleteMany({"locationId": new ObjectId(id)})
    void client.close()
    revalidatePath("/", "page")
}


export const getLocationsDataByDate = async (id: string): Promise<DailyData[]> => {
    const client = await connectToDatabase()
    let locations: DailyData[] = await client.db().collection<DBLocation>("data").aggregate<DailyData>([
        {
            $addFields: {
                datetime: {$toDate: "$datetime"} // Convert the date field from string to date type
            }
        },
        {
            $match: {
                locationId: new ObjectId(id),
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

    return locations;
}