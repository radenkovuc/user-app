import {NextRequest, NextResponse} from "next/server";
import {compareSync} from 'bcrypt-ts';

import {findUserByEmail} from "@/services/db";
import {decrypt} from "@/services";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const user = await findUserByEmail(body.email)
    if (user) {
        const decrPass = decrypt(body.password)
        if (compareSync(decrPass, user.password)) {
            return NextResponse.json({message: "Found", user}, {status: 200})
        }
    }
    return NextResponse.json({message: "User not found"}, {status: 404})
}

export async function GET(req: NextRequest) {
    return NextResponse.json({message: "NO no"}, {status: 200})
}

export const dynamic = 'force-dynamic'
