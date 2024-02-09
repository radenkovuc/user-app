"use client"
import {useState} from "react";
import {Button} from "@mui/material";

import {Location} from "@/src/domain/location";
import {UpdatedLocation} from "@/src/domain/updatedLocation";

import {updateLocationData} from "@/src/services/dbServices";

import {UpdatedLocations} from "@/src/components/locations/updatedLocations";

interface Props {
    locations: Location[]
}

export const UpdateLocations = ({locations}: Props) => {
    const [updatedLocations, setUpdatedLocations] = useState<UpdatedLocation[]>([])
    const [loading, setLoading] = useState(false)

    const update = async (l: Location) => {
        const newData = await updateLocationData(l)
        setUpdatedLocations(updatedLocations => [...updatedLocations, {
            name: l.name,
            old: newData.old,
            new: newData.new
        }])
    }

    const onUpdate = async () => {
        setUpdatedLocations([])
        setLoading(true)
        for (const l of locations) {
            await update(l)
        }
        setLoading(false)
    }

    return <div>
        <Button disabled={loading} variant="contained" onClick={onUpdate}>Update Locations</Button>
        <UpdatedLocations locations={updatedLocations}/>
    </div>
}
