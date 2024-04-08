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
            <Typography className={classes.title}>Water temperature today:</Typography>
            <div className={classes.valuesContainer}>
                <Typography>Current: {currentTemperature ? `${currentTemperature.value} C` : "Loading..."}</Typography>
                <Typography>Min: {todayTemperature ? `${todayTemperature.min_value} C` : "Loading..."}</Typography>
                <Typography>Average: {todayTemperature ? `${todayTemperature.avg_value} C` : "Loading..."}</Typography>
                <Typography>Max: {todayTemperature ? `${todayTemperature.max_value} C` : "Loading..."}</Typography>
            </div>
            <Typography className={classes.title}>Water level today:</Typography>
            <div className={classes.valuesContainer}>
                <Typography>Current: {currentWaterLevel ? `${currentWaterLevel.value} cm` : "Loading..."}</Typography>
                <Typography>Min: {todayWaterLevel ? `${todayWaterLevel.min_value} cm` : "Loading..."}</Typography>
                <Typography>Average: {todayWaterLevel ? `${todayWaterLevel.avg_value} cm` : "Loading..."}</Typography>
                <Typography>Max: {todayWaterLevel ? `${todayWaterLevel.max_value} cm` : "Loading..."}</Typography>
            </div>
        </div>
    </div>
}
