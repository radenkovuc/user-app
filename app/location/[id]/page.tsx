import {notFound} from "next/navigation";
import {Typography} from "@mui/material";

import {getLocation, getLocationData, getLocationsDataByDate} from "@/src/services/dbServices";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";

import Header from "@/src/components/header";
import Body from "@/src/components/body";
import {DailyData} from "@/src/components/location/dailyData";

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

    return (
        <>
            <Header title={location.name}/>
            <Body>
                <DailyData id={params.id} data={data}/>
                <Typography>All data:</Typography>
                {data.map(d => <Typography key={d.datetime}>{d.datetime} - {d.value}</Typography>)}
            </Body>
        </>
    )
}

export default Location