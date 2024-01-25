import Link from "next/link";
import {Typography} from "@mui/material";

import {Location} from "@/src/domain/location";

import {LocationActions} from "./locationActions";
import classes from "./locations.module.css";

interface Props {
    location: Location
}

export const SingleLocation = ({location}: Props) => (
    <div className={classes.location}>
        <Link className={classes.locationLink} href={`/location/${location._id}`}>
            <Typography variant="subtitle1">{location.name}</Typography>
        </Link>
        <LocationActions id={location._id.toString()} url={location.url}/>
    </div>
)
