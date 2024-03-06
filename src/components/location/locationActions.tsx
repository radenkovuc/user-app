"use client"

import {Button, Typography} from "@mui/material";

import {Location} from "@/src/domain";
import {loadLocationData} from "@/src/services";
import {updateLocationData} from "@/src/services/db";
import {addMessage, useAppDispatch} from "@/src/store";

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
