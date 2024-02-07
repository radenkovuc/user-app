import {Typography} from "@mui/material";

import {getLocationsDataByDate} from "@/src/services/dbServices";
import {DailyChart} from "@/src/components/location/dailyChart";

import classes from "./location.module.css";

interface Props {
    id: string
}

export const DailyData = async ({id}: Props) => {
    const dataByDate = await getLocationsDataByDate(id)

    return (
        <div className={classes.dailyData}>
            <Typography>Daily:</Typography>
            <DailyChart dataByDate={dataByDate}/>
        </div>
    )
}

