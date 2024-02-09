"use client"

import {Button} from "@mui/material";
import Link from "next/link";

import classes from "./locations.module.css";

interface Props {
    id: string,
    url: string
}

export const LocationActions = ({id, url}: Props) => {

    const onClick = () => {
        console.log('onClick')
        // void deleteLocation(id)
    }

    return <div className={classes.actions}>

        <Button>
            <Link href={url} target="_blank">Link</Link>
        </Button>
        <Button onClick={onClick}>Delete</Button>
    </div>
}
