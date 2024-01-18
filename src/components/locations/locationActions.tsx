"use client"

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
        <a className={classes.link} href={url} target="_blank">Link</a>
        <div className={classes.link} onClick={onClick}>Delete</div>
    </div>
}
