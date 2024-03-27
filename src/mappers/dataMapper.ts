import {ObjectId} from "mongodb";

import {DBData, DBLocation, DBSource} from "@/domain/db";
import {Data, Location, Source} from "@/domain";

export const mapDBData = (data: Data): DBData => ({
    datetime: data.datetime,
    value: data.value,
    sourceId: new ObjectId(data.sourceId)
})

export const mapDBSource = (source: Source): DBSource => ({
    url: source.url,
    _id: new ObjectId(source.id)
})

export const mapDBLocation = (location: Location): DBLocation => ({
    _id: new ObjectId(location.id),
    name: location.name,
    temperature: mapDBSource(location.temperature),
    waterLevel: mapDBSource(location.waterLevel)
})