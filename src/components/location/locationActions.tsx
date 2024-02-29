"use client"

import {useRouter} from "next/navigation";
import {Button, Typography} from "@mui/material";

import {Location} from "@/src/domain";
import {loadLocationData} from "@/src/services";
import {updateLocationData} from "@/src/services/db";
import {addMessage, useAppDispatch} from "@/src/store";

interface Props {
    location: Location,
}

export const LocationActions = ({location}: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const onUpdate = async () => {
        const newData = await updateLocationData(location)
        void loadLocationData(location.id, dispatch)
        dispatch(addMessage(newData.new ? `Added ${newData.new} new data` : "No new data"))
        router.refresh()
    }

    return <Button onClick={onUpdate}>
        <Typography>Update</Typography>
    </Button>
}
