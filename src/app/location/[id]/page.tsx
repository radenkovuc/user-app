import {notFound} from "next/navigation";

import {getLocation} from "@/services/db";

import {Location} from "@/domain";

import Header from "@/components/header";
import Body from "@/components/body";
import {DailyData} from "@/components/location/dailyData";

export async function generateMetadata({params}: Props) {
    const {id} = await params
    const location: Location | null = await getLocation(id)

    if (!location) {
        notFound()
    }
    return {
        title: location.name,
        description: "Data for selected location"
    }
}

interface Props {
    params: Promise<{
        id: string
    }>
}

const LocationPage = async ({params}: Props) => {
    const {id} = await params
    const location: Location | null = await getLocation(id)

    if (!location) {
        notFound()
    }

    return (
        <>
            <Header title={location.name}/>
            <Body>
                <DailyData id={id} location={location}/>
            </Body>
        </>
    )
}

export default LocationPage
