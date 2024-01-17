import {Metadata} from "next";

import {getLocations} from "@/src/services/locationServices";
import {Location} from "@/src/domain/location";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Locations",
    description: "List with locations"
}

const Home = async () => {
    const data: Location[] = await getLocations()

    return (
        <>
            <div>Home</div>
            {data.map(l => <div key={l.name}>
                <Link href={`/location/${l.id}`}>
                    {l.name} - {l.url}
                </Link>
            </div>)}
        </>
    )
}

export const dynamic = 'force-dynamic'
export default Home