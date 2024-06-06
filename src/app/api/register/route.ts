import {NextRequest, NextResponse} from "next/server";
import {hashSync} from 'bcrypt-ts';

import {findUserByEmail, saveUser} from "@/services/db";
import {decrypt} from "@/services";


export async function POST(req: NextRequest) {
    const body = await req.json()
    const user = await findUserByEmail(body.email)
    if (user) {
        return NextResponse.json({message: "User already exist"}, {status: 404})
    } else {
        const decrPass = decrypt(body.password)
        const hashPass = hashSync(decrPass)
        await saveUser(body.email, hashPass)
        return NextResponse.json({message: "User registered", user: body}, {status: 200})
    }
}

export async function GET(req: NextRequest) {
    return NextResponse.json({message: "NO no"}, {status: 200})
}

export const dynamic = 'force-dynamic'
