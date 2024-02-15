import {DBData} from "@/src/domain/db/data";
import {Data} from "@/src/domain/data";
import {DBLocation} from "@/src/domain/db/location";
import {Location} from "@/src/domain/location";

export const mapData = (data: DBData): Data => ({
    datetime: data.datetime,
    value: data.value,
    locationId: data.locationId.toString()
})

export const mapLocation = (location: DBLocation): Location => ({
    name: location.name,
    url: location.url,
    id: location._id.toString()
})