import {NextResponse} from "next/server";

import {getSources, updateSourceData} from "@/src/services/dbServices";
import {UpdatedLocation} from "@/src/domain/updatedLocation";

export async function GET() {
    const allData: UpdatedLocation[] = []
    const locations = await getSources()
    for (const location of locations) {
        const data = await updateSourceData(location)
        allData.push({name: location.name, old: data.old, new: data.new})
    }

    return NextResponse.json({message: "SYNC DONE", allData}, {status: 200})
}

export const dynamic = 'force-dynamic'