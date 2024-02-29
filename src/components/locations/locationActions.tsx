"use client"

import Link from "next/link";
import {Button, Typography} from "@mui/material";

import {Location} from "@/src/domain";
import {updateLocationData} from "@/src/services/db";
import {addMessage, useAppDispatch} from "@/src/store";

import classes from "./locations.module.css";

interface Props {
    location: Location,
}

export const LocationActions = ({location}: Props) => {
    const dispatch = useAppDispatch();

    const onUpdate = async () => {
        const newData = await updateLocationData(location)
        dispatch(addMessage(`${location.name} - new: ${newData.new}, old: ${newData.old}`))
    }

    return <div className={classes.actions}>

        <Button onClick={onUpdate}>
            <Typography>Update</Typography>
        </Button>
        <Button>
            <Link className={classes.locationLink} href={`/location/${location.id}`}>
                <Typography>Open</Typography>
            </Link>
        </Button>
    </div>
}
