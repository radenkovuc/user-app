import {NextRequest, NextResponse} from "next/server";
import {getRecipes, updateRecipes} from "@/services/db/recipesrServices";

export async function GET() {
    const recipes = await getRecipes()

    return NextResponse.json(recipes, {status: 200})
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    await updateRecipes(body)

    return NextResponse.json({message: "Recipes updated"}, {status: 200})

}

export const dynamic = 'force-dynamic'
