"use client"

import {deleteLocation} from "@/src/services/dbServices";

import classes from "./locations.module.css";

interface Props {
    id: string
}

export const LocationActions = ({id}: Props) => {

    const onClick = () => {
        console.log('onClick')
        void deleteLocation(id)
    }

    return <div className={classes.deleteLink} onClick={onClick}>Delete</div>
}
