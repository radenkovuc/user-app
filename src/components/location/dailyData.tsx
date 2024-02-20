import {Typography} from "@mui/material";

import {getSourceData, getSourceDataByDate} from "@/src/services/dbServices";
import {Data} from "@/src/domain/data";
import {DailyData as DData} from "@/src/domain/dailyData";

import {DailyChart} from "@/src/components/location/dailyChart";
import {TotalChart} from "@/src/components/location/totalChart";

import classes from "./location.module.css";

interface Props {
    id: string
}

export const DailyData = async ({id}: Props) => {
    const dataByDate: DData[] = await getSourceDataByDate(id)
    const data: Data[] = await getSourceData(id)

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

