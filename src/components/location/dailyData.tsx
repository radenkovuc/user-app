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
    const {locationData} = useAppSelector(s => s.location)
    const dispatch = useAppDispatch();

    useEffect(() => {
        void loadLocationData(id, dispatch)
    }, [dispatch, id])


    return (
        <div className={classes.dailyData}>
            <LocationHeader location={location}/>
            <Typography>Water temperature last 7 days:</Typography>
            <TotalChart data={locationData.temperature.lastData}/>
            <Typography>Water level last 7 days:</Typography>
            <TotalChart data={locationData.waterLevel.lastData}/>
            <Typography>Daily min-max water temperature:</Typography>
            <DailyChart data={locationData.temperature.dailyData}/>
            <Typography>Daily min-max water level:</Typography>
            <DailyChart data={locationData.waterLevel.dailyData}/>
        </div>
    )
}

