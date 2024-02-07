"use server"

import {MongoClient, ObjectId} from "mongodb";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";
import {DailyData} from "@/src/domain/dailyData";

import {getLocationDataFromUrl} from "@/src/services/locationServices";
import {revalidatePath} from "next/cache";

export const connectToDatabase = async (): Promise<MongoClient> => {
    return await MongoClient.connect(process.env.MONGODB_URI || "");
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

export const getLocation = async (id: string): Promise<Location | null> => {
    const client = await connectToDatabase()
    const db = client.db()
    const location = await db.collection<Location>("location").findOne({"_id": new ObjectId(id)})
    void client.close()

    return location

}

export const getLocations = async () => {
    const client = await connectToDatabase()
    let locations: Location[] = await client.db().collection<Location>("location").find().toArray()
    void client.close()

    return locations;
}

export const addLocation = async (name: string, url: string) => {
    const client = await connectToDatabase()
    await client.db().collection<Location>("location").insertOne({_id: new ObjectId(), name, url})
    void client.close()
}

export const deleteLocation = async (id: string) => {
    const client = await connectToDatabase()
    await client.db().collection<Location>("location").findOneAndDelete({"_id": new ObjectId(id)})
    await client.db().collection<Data>("data").deleteMany({"locationId": new ObjectId(id)})
    void client.close()
    revalidatePath("/", "page")
}


export const getLocationsDataByDate = async (id: string): Promise<DailyData[]> => {
    const client = await connectToDatabase()
    let locations: DailyData[] = await client.db().collection<Location>("data").aggregate<DailyData>([
        {
            $addFields: {
                datetime: {$toDate: "$datetime"} // Convert the date field from string to date type
            }
        },
        {
            $match: {
                locationId: new ObjectId(id)
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