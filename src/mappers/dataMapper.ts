import {ObjectId} from "mongodb";

import {DBData} from "@/domain/db";
import {Data} from "@/domain";

export const mapDBData = (data: Data, sourceId: string): DBData => ({
    datetime: new Date(data.datetime.replace(" ", "T")),
    value: data.value,
    sourceId: new ObjectId(sourceId)
})


