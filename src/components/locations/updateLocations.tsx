"use client"
import {useState} from "react";
import {Button} from "@mui/material";

import {Location} from "@/src/domain/location";
import {updateSourceData} from "@/src/services/dbServices";
import {addMessage, useAppDispatch} from "@/src/store";

interface Props {
    locations: Location[]
}

export const UpdateLocations = ({locations}: Props) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch();

    const update = async (l: Location) => {
        const newData = await updateSourceData(l)
        dispatch(addMessage(`${l.name} - new: ${newData.new}, old: ${newData.old}`))
    }

    const onUpdate = async () => {
        setLoading(true)
        for (const l of locations) {
            await update(l)
        }
        setLoading(false)
    }

    return <div>
        <Button disabled={loading} variant="contained" onClick={onUpdate}>Update Locations</Button>
    </div>
}
