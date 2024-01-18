import {Metadata} from "next";

import Header from "@/src/components/header";
import Body from "@/src/components/body";
import Locations from "@/src/components/locations";

export const metadata: Metadata = {
    title: "Locations",
    description: "List with locations"
}

const Home = async () => {
    // void addLocation("Test", 'http://81.93.72.16/dist/examples/ahsVolari_vodostaj.php')

    return (
        <>
            <Header title="Locations"/>
            <Body>
                <Locations/>
            </Body>
        </>
    )
}

export const dynamic = 'force-dynamic'
export default Home