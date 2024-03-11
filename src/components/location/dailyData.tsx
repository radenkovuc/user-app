'use client'
import {Typography} from "@mui/material";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "@/store";
import {loadLocationData} from "@/services";
import {Location} from "@/domain";

import {DailyChart} from "./dailyChart";
import {TotalChart} from "./totalChart";

import {LocationHeader} from "./locationHeader";

import classes from "./location.module.css";

interface Props {
    id: string
    location: Location
}

export const DailyData = ({id, location}: Props) => {
    const {temperatures, waterLevels, dailyWaterLevels, dailyTemperatures} = useAppSelector(s => s.location)
    const dispatch = useAppDispatch();

    useEffect(() => {
        void loadLocationData(id, dispatch)
    }, [dispatch, id])


    return (
        <div className={classes.dailyData}>
            <LocationHeader location={location}/>
            <Typography>Temperature last 7 days:</Typography>
            <TotalChart data={temperatures.slice(-1 * 7 * 48)}/>
            <Typography>Water level last 7 days:</Typography>
            <TotalChart data={waterLevels.slice(-1 * 7 * 48)}/>
            <Typography>Daily min-max temperature:</Typography>
            <DailyChart data={dailyTemperatures}/>
            <Typography>Daily min-max water level:</Typography>
            <DailyChart data={dailyWaterLevels}/>
            <Typography>Total temperature:</Typography>
            <TotalChart data={temperatures}/>
            <Typography>Total water level:</Typography>
            <TotalChart data={waterLevels}/>
        </div>
    )
}

