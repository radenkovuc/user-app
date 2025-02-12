import {ObjectId} from "mongodb";

import {SourceData} from "@/domain";

export type DBLocationData = {
    _id: ObjectId,
    temperature: SourceData
    waterLevel: SourceData
}
