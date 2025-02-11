"use client"

import {Button, Typography} from "@mui/material";

import {Location} from "@/domain";
import {updateLocationData} from "@/services/db";
import {addMessage, resetData, setLocationData, useAppDispatch} from "@/store";

interface Props {
    location: Location,
}

export const LocationActions = ({location}: Props) => {
    const dispatch = useAppDispatch();

    const onUpdate = async () => {
        dispatch(resetData())
        const locationData = await updateLocationData(location)
        dispatch(setLocationData(locationData))
        dispatch(addMessage("Location data updated"))
    }

    return <Button onClick={onUpdate}>
        <Typography>Update now</Typography>
    </Button>
}
