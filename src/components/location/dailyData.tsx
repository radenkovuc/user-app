'use client'
import {Typography} from "@mui/material";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "@/src/store";
import {loadLocationData} from "@/src/services";
import {Location} from "@/src/domain";

import {DailyChart} from "./dailyChart";
import {TotalChart} from "./totalChart";

import {LocationHeader} from "./locationHeader";

import classes from "./location.module.css";

interface Props {
    id: string
    location: Location
}

export const DailyData = ({id, location}: Props) => {
    const {data, dataByDate} = useAppSelector(s => s.location)
    const dispatch = useAppDispatch();

    useEffect(() => {
        void loadLocationData(id, dispatch)
    }, [dispatch, id])


    return (
        <div className={classes.dailyData}>
            <LocationHeader location={location}/>
            <Typography>Temperature last 7 days:</Typography>
            <TotalChart data={data[0].slice(-1 * 7 * 48)}/>
            <Typography>Water level last 7 days:</Typography>
            <TotalChart data={data[1].slice(-1 * 7 * 48)}/>
            <Typography>Daily min-max temperature:</Typography>
            <DailyChart data={dataByDate[0]}/>
            <Typography>Daily min-max water level:</Typography>
            <DailyChart data={dataByDate[1]}/>
            <Typography>Total temperature:</Typography>
            <TotalChart data={data[0]}/>
            <Typography>Total water level:</Typography>
            <TotalChart data={data[1]}/>
        </div>
    )
}

