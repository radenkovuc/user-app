import {notFound} from "next/navigation";

import {getLocation, getLocationData} from "@/src/services/dbServices";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";

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
    const data: Data[] = await getLocationData(location)
    const title = location.name + " - last update: " + data[data.length - 1].datetime

    return (
        <>
            <Header title={title} actions={<LocationActions location={location}/>}/>
            <Body>
                <DailyData id={params.id} data={data}/>
            </Body>
        </>
    )
}

export default Location