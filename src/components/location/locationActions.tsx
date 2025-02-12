"use client"

import {Button, CircularProgress, Typography} from "@mui/material";

import {Location} from "@/domain";
import {updateLocationData} from "@/services/db";
import {addMessage, setIsUpdate, setLocationData, useAppDispatch, useAppSelector} from "@/store";

interface Props {
    location: Location,
}

export const LocationActions = ({location}: Props) => {
    const {isUpdate} = useAppSelector(s => s.location)
    const dispatch = useAppDispatch();

    const onUpdate = async () => {
        dispatch(setIsUpdate(true))
        const locationData = await updateLocationData(location)
        dispatch(setLocationData(locationData))
        dispatch(setIsUpdate(false))
        dispatch(addMessage("Location data updated"))
    }

    return <>
        <Button onClick={onUpdate} disabled={isUpdate}>
            <Typography>Update now</Typography>
        </Button>
        {isUpdate && <CircularProgress size={10}/>}
    </>
}
