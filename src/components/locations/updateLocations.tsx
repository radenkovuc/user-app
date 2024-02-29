"use client"
import {useEffect, useState} from "react";
import {Button} from "@mui/material";

import {Location} from "@/src/domain";
import {getLocations, updateLocationData} from "@/src/services/db";
import {addMessage, useAppDispatch} from "@/src/store";

export const UpdateLocations = () => {
    const [loading, setLoading] = useState(false)
    const [locations, setLocations] = useState<Location[]>([])
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadLocations = async () => {
            const locations = await getLocations()
            setLocations(locations)
        }

        void loadLocations()
    }, [])

    const update = async (l: Location) => {
        const newData = await updateLocationData(l)
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
