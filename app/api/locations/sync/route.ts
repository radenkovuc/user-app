import {NextResponse} from "next/server";
import {getLocationData, getLocations} from "@/src/services/dbServices";

export async function GET() {
    const locations = await getLocations()
    locations.forEach(location => getLocationData(location))

    return NextResponse.json({message: "SYNC DONE"}, {status: 200})
}

export const dynamic = 'force-dynamic'