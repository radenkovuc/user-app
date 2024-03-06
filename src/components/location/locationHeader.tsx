"use client"

import {Typography} from "@mui/material";

import {Location} from "@/src/domain";
import {useAppSelector} from "@/src/store";

import {LocationActions} from "./locationActions";

import classes from "./location.module.css";

interface Props {
    location: Location,
}

export const LocationHeader = ({location}: Props) => {
    const {data, dataByDate} = useAppSelector(s => s.location)

    const todayTemperature = dataByDate[0].length ? dataByDate[0][dataByDate[0].length - 1] : undefined;
    const todayWaterLevel = dataByDate[1].length ? dataByDate[1][dataByDate[1].length - 1] : undefined;
    const currentTemperature = data[0].length ? data[0][data[0].length - 1] : undefined;
    const currentWaterLevel = data[1].length ? data[1][data[1].length - 1] : undefined;


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
