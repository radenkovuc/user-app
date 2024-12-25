import {NextResponse} from "next/server";

import {getLocations, updateLocationData} from "@/services/db";
import {UpdatedLocation} from "@/domain";

export async function GET() {
    const allData: UpdatedLocation[] = []
    const locations = await getLocations()
    for (const location of locations) {
        const data = await updateLocationData(location)
        allData.push({name: location.name, old: data.old, new: data.new})
    }

    return NextResponse.json({message: "SYNC DONE", allData}, {status: 200})
}
