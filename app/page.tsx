import {Metadata} from "next";

import Header from "@/src/components/header";
import Body from "@/src/components/body";
import Locations, {UpdateLocations} from "@/src/components/locations";

export const metadata: Metadata = {
    title: "Locations",
    description: "List with locations"
}

const Home = async () => (
    <>
        <Header title="Locations"/>
        <Body>
            <Locations/>
            <UpdateLocations/>
        </Body>
    </>
)

export const dynamic = 'force-dynamic'
export default Home