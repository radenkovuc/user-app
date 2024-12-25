import {Metadata} from "next";

import Header from "@/components/header";
import Body from "@/components/body";
import Messages from "@/app/test/message";

export const metadata: Metadata = {
    title: "Locations",
    description: "List with locations"
}

const Home = async () => (
    <>
        <Header title="Locations"/>
        <Body>
            <Messages/>
        </Body>
    </>
)

export default Home
