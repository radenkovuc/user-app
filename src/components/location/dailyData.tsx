import {Typography} from "@mui/material";

import {getLocationsDataByDate} from "@/src/services/dbServices";
import {Data} from "@/src/domain/data";

import {DailyChart} from "@/src/components/location/dailyChart";
import {TotalChart} from "@/src/components/location/totalChart";
import classes from "./location.module.css";

interface Props {
    id: string
    data: Data[]
}

export const DailyData = async ({id, data}: Props) => {
    const dataByDate = await getLocationsDataByDate(id)

    return (
        <div className={classes.dailyData}>
            <Typography>Daily min-max:</Typography>
            <DailyChart dataByDate={dataByDate}/>
            <Typography>Total :</Typography>
            <TotalChart data={data}/>
            <Typography>Total last 7 days:</Typography>
            <TotalChart data={data.slice(-1 * 7 * 48)}/>
        </div>
    )
}

