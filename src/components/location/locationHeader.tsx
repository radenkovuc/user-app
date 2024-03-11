"use client"

import {Typography} from "@mui/material";

import {Location} from "@/domain";
import {useAppSelector} from "@/store";

import {LocationActions} from "./locationActions";

import classes from "./location.module.css";

interface Props {
    location: Location,
}

export const LocationHeader = ({location}: Props) => {
    const {temperatures, waterLevels, dailyTemperatures, dailyWaterLevels} = useAppSelector(s => s.location)

    const todayTemperature = dailyTemperatures.length ? dailyTemperatures[dailyTemperatures.length - 1] : undefined;
    const todayWaterLevel = dailyWaterLevels.length ? dailyWaterLevels[dailyWaterLevels.length - 1] : undefined;
    const currentTemperature = temperatures.length ? temperatures[temperatures.length - 1] : undefined;
    const currentWaterLevel = waterLevels.length ? waterLevels[waterLevels.length - 1] : undefined;


    return <div className={classes.header}>
        <div className={classes.updateContainer}>
            <Typography>Last
                update: {currentTemperature?.datetime || currentWaterLevel?.datetime || "Loading..."}</Typography>
            <LocationActions location={location}/>
        </div>
        <div className={classes.dataContainer}>
            <Typography className={classes.title}>Temperature today:</Typography>
            <div className={classes.valuesContainer}>
                <Typography>Current: {currentTemperature?.value || "Loading..."}</Typography>
                <Typography>Min: {todayTemperature?.min_value || "Loading..."}</Typography>
                <Typography>Max: {todayTemperature?.max_value || "Loading..."}</Typography>
            </div>
            <Typography className={classes.title}>Water level today:</Typography>
            <div className={classes.valuesContainer}>
                <Typography>Current: {currentWaterLevel?.value || "Loading..."}</Typography>
                <Typography>Min: {todayWaterLevel?.min_value || "Loading..."}</Typography>
                <Typography>Max: {todayWaterLevel?.max_value || "Loading..."}</Typography>
            </div>
        </div>
    </div>
}
