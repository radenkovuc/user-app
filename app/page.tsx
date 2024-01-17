import {Metadata} from "next";
import Link from "next/link";

import {getLocations} from "@/src/services/locationServices";

import {Location} from "@/src/domain/location";

import Header from "@/src/components/header";
import Body from "@/src/components/body";

export const metadata: Metadata = {
    title: "Locations",
    description: "List with locations"
}

const Home = async () => {
    const data: Location[] = await getLocations()

    return (
        <>
            <Header title="Locations"/>

            <Body>
                {data.map(l => <div key={l.name}>
                    <Link href={`/location/${l._id}`}>
                        {l.name} - {l.url}
                    </Link>
                </div>)}
            </Body>
        </>
    )
}

export const dynamic = 'force-dynamic'
export default Home