import {notFound} from "next/navigation";

import {getData, getLocation} from "@/src/services/db";

import {Data, Location} from "@/src/domain";

import Header from "@/src/components/header";
import Body from "@/src/components/body";
import {DailyData} from "@/src/components/location/dailyData";
import {LocationActions} from "@/src/components/location/locationActions";

export async function generateMetadata({params}: Props) {
    const location: Location | null = await getLocation(params.id)

    if (!location) {
        notFound()
    }
    return {
        title: location.name,
        description: "Data for selected location"
    }
}

interface Props {
    params: {
        id: string
    }
}

const Location = async ({params}: Props) => {
    const location: Location | null = await getLocation(params.id)

    if (!location) {
        notFound()
    }
    const data: Data[] = await getData(location.temperature.id)
    //TODO Implement
    const title = location.name + (data.length ? " - last update: " + data[data.length - 1].datetime : "")

    return (
        <>
            <Header title={title} actions={<LocationActions location={location}/>}/>
            <Body>
                <DailyData id={params.id}/>
            </Body>
        </>
    )
}

export default Location