import {NextResponse} from "next/server";

import {getLocationData, getLocations} from "@/src/services/dbServices";
import {Data} from "@/src/domain/data";

export async function GET() {
    const allData: Data[][] = []
    const locations = await getLocations()
    for (const location of locations) {
        const data = await getLocationData(location)
        allData.push(data)
    }

    return NextResponse.json({message: "SYNC DONE", allData}, {status: 200})
}

export const dynamic = 'force-dynamic'