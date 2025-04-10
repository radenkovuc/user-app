"use client"
import {useEffect, useState} from "react";
import {Button} from "@mui/material";

import {Location} from "@/domain";
import {getLocations, updateLocationData} from "@/services/db";
import {addMessage, useAppDispatch} from "@/store";

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
        await updateLocationData(l)
        dispatch(addMessage(`${l.name} - data updated`))
    }

    const onUpdate = async () => {
        setLoading(true);
        await Promise.all(locations.map(l => update(l)));
        setLoading(false);
    };

    return <div>
        <Button id="update" disabled={loading} variant="contained" onClick={onUpdate}>Update Locations</Button>
    </div>
}
