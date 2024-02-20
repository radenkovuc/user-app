"use client"

import {useState} from "react";
import Link from "next/link";
import {Button, Typography} from "@mui/material";

import {Location} from "@/src/domain/location";
import {updateSourceData} from "@/src/services/dbServices";

import classes from "./locations.module.css";

interface Props {
    location: Location,
}

export const LocationActions = ({location}: Props) => {
    const [newData, setNewData] = useState<number | null>(null)

    const onUpdate = async () => {
        const newData = await updateSourceData(location)
        setNewData(newData.new)
        console.log('onUpdate')
    }

    const onDelete = () => {
        console.log('onDelete')
        // void deleteLocation(id)
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
        {newData != null &&
            <Typography>new: {newData}</Typography>
        }
        <Button>
            <Link href={location.url} target="_blank">Link</Link>
        </Button>
        <Button onClick={onDelete}>Delete</Button>
    </div>
}
