import {NextResponse} from "next/server";

type Data = {
    datetime: string
    value: number
}

const getData = (scriptText: string): Data[] => {
    // Regular expression to extract the date-time and numerical values from niz.push lines
    const nizPushRegex = /niz\.push\(\['(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})',\s*(-?\d+(\.\d+)?)\]\);/g;

    // Extracting the date-time and numerical values using the regular expression
    // @ts-ignore
    const matches = [...scriptText.matchAll(nizPushRegex)];

    if (matches.length > 0) {
        // Extracted data
        return matches.map(match => ({
            datetime: match[1],
            value: parseFloat(match[2])
        }))
    } else {
        console.error('Failed to extract data from the niz.push lines in the HTML text.');
        return []
    }
}

export async function GET() {
    console.log("Location call")

    try {
        const dataRaw = await fetch("http://81.93.72.16/dist/examples/ahsDelSelo_temperatura.php")
        const body = await dataRaw.text()
        return NextResponse.json(getData(body), {status: 200})
    } catch (e) {
        return NextResponse.json({message: "Error"}, {status: 400})
    }

}