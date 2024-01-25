"use client"

import {Button} from "@mui/material";

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
            <a href={url} target="_blank">Link</a>
        </Button>
        <Button onClick={onClick}>Delete</Button>
    </div>
}
