import {Typography} from "@mui/material";

import {getLocationsDataByDate} from "@/src/services/dbServices";
import {DailyChart} from "@/src/components/location/dailyChart";

import classes from "./location.module.css";
import {Data} from "@/src/domain/data";
import {TotalChart} from "@/src/components/location/totalChart";

interface Props {
    id: string
    data:Data[]
}

export const DailyData = async ({id,data}: Props) => {
    const dataByDate = await getLocationsDataByDate(id)

    return (
        <div className={classes.dailyData}>
            <Typography>Daily min-max:</Typography>
            <DailyChart dataByDate={dataByDate}/>
            <Typography>Total :</Typography>
            <TotalChart data={data}/>
        </div>
    )
}

