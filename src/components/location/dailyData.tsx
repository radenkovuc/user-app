'use client'
import {Typography} from "@mui/material";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "@/src/store";
import {loadLocationData} from "@/src/services/stateServices";

import {DailyChart} from "@/src/components/location/dailyChart";
import {TotalChart} from "@/src/components/location/totalChart";

import classes from "./location.module.css";

interface Props {
    id: string
}

export const DailyData = ({id}: Props) => {
    const data = useAppSelector(s => s.location.data)
    const dispatch = useAppDispatch();

    useEffect(() => {
        void loadLocationData(id, dispatch)
    }, [dispatch, id])


    return (
        <div className={classes.dailyData}>
            <Typography>Daily min-max:</Typography>
            <DailyChart/>
            <Typography>Total :</Typography>
            <TotalChart data={data}/>
            <Typography>Total last 7 days:</Typography>
            <TotalChart data={data.slice(-1 * 7 * 48)}/>
        </div>
    )
}

