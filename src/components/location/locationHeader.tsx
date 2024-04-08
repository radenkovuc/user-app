"use client"

import {Typography} from "@mui/material";

import {Location} from "@/domain";
import {useAppSelector} from "@/store";

import {LocationActions} from "./locationActions";
import {LocationData} from "./locationData";

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
                <LocationData value={currentTemperature?.value} sign='C' title='Current'/>
                <LocationData value={todayTemperature?.min_value} sign='C' title='Min'/>
                <LocationData value={todayTemperature?.avg_value} sign='C' title='Average'/>
                <LocationData value={todayTemperature?.max_value} sign='C' title='Max'/>
            </div>
            <Typography className={classes.title}>Water level today:</Typography>
            <div className={classes.valuesContainer}>
                <LocationData value={currentWaterLevel?.value} sign='cm' title='Current'/>
                <LocationData value={todayWaterLevel?.min_value} sign='cm' title='Min'/>
                <LocationData value={todayWaterLevel?.avg_value} sign='cm' title='Average'/>
                <LocationData value={todayWaterLevel?.max_value} sign='cm' title='Max'/>
            </div>
        </div>
    </div>
}
