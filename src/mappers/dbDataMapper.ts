import {DBData, DBLocation, DBSource} from "@/domain/db";
import {Data, Location, Source} from "@/domain";

export const mapData = (data: DBData): Data => ({
    datetime: data.datetime,
    value: data.value,
})

export const mapSource = (source: DBSource): Source => ({
    url: source.url,
    id: source._id.toString()
})

export const mapLocation = (location: DBLocation): Location => ({
    id: location._id.toString(),
    name: location.name,
    temperature: mapSource(location.temperature),
    waterLevel: mapSource(location.waterLevel)
})
