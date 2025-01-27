"use client"

import {Button, Typography} from "@mui/material";

import {Location} from "@/domain";
import {loadLocationData} from "@/services";
import {updateLocationData} from "@/services/db";
import {addMessage, resetData, useAppDispatch} from "@/store";

interface Props {
    location: Location,
}

export const LocationActions = ({location}: Props) => {
    const dispatch = useAppDispatch();

    const onUpdate = async () => {
        const newData = await updateLocationData(location)
        void loadLocationData(location.id, dispatch)

        if (newData.new) {
            dispatch(addMessage(`Added ${newData.new} new data`))
        } else {
            dispatch(addMessage("No new data"))
        }
    }

    return <Button onClick={onUpdate}>
        <Typography>Update now</Typography>
    </Button>
}
