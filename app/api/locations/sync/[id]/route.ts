import {NextResponse} from "next/server";

import {getLocation, updateLocationData} from "@/src/services/dbServices";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    const location = await getLocation(params.id)
    if (!location) {
        return NextResponse.error()
    }
    const data = await updateLocationData(location)

    return NextResponse.json({message: "SYNC DONE", data}, {status: 200})
}

export const dynamic = 'force-dynamic'