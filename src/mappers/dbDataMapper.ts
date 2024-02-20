import {DBData} from "@/src/domain/db/data";
import {Data} from "@/src/domain/data";
import {Source} from "@/src/domain/source";
import {DBSource} from "@/src/domain/db/source";

export const mapData = (data: DBData): Data => ({
    datetime: data.datetime,
    value: data.value,
    sourceId: data.sourceId.toString()
})

export const mapSource = (source: DBSource): Source => ({
    name: source.name,
    url: source.url,
    id: source._id.toString()
})