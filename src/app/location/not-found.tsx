import {Metadata} from "next";

import Header from "@/components/header";
import Body from "@/components/body";

export const metadata: Metadata = {
    title: "Location not Found",
    description: "Location not Found"
}

const NotFound = () => (
    <>
        <Header title="Location not Found"/>
        <Body>
            <div>Location not Found</div>
        </Body>
    </>)

export default NotFound