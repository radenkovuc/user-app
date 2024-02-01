import {notFound} from "next/navigation";
import {Typography} from "@mui/material";

import {getLocation, getLocationData, getLocationsDataByDate} from "@/src/services/dbServices";

import {Data} from "@/src/domain/data";
import {Location} from "@/src/domain/location";

import Header from "@/src/components/header";
import Body from "@/src/components/body";

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
    const dataByDate = await getLocationsDataByDate(params.id)

    return (
        <>
            <Header title={location.name}/>
            <Body>
                <Typography>Daily:</Typography>
                {dataByDate.map(d => <Typography key={d._id}>{d._id}: {d.min_value} - {d.max_value}</Typography>)}
                <Typography>All data:</Typography>
                {data.map(d => <Typography key={d.datetime}>{d.datetime} - {d.value}</Typography>)}
            </Body>
        </>
    )
}

export default Location