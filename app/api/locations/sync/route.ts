import {NextResponse} from "next/server";

import {getLocations, updateLocationData} from "@/src/services/db";
import {UpdatedLocation} from "@/src/domain";

export async function GET() {
    const allData: UpdatedLocation[] = []
    const locations = await getLocations()
    for (const location of locations) {
        const data = await updateLocationData(location)
        allData.push({name: location.name, old: data.old, new: data.new})
    }

    return NextResponse.json({message: "SYNC DONE", allData}, {status: 200})
}

export const dynamic = 'force-dynamic'