import Link from "next/link";
import {Typography} from "@mui/material";

import {Location} from "@/src/domain";

import {LocationActions} from "./locationActions";
import classes from "./locations.module.css";

interface Props {
    location: Location
}

export const SingleLocation = ({location}: Props) => (
    <div className={classes.location}>
        <Link className={classes.locationLink} href={`/location/${location.id}`}>
            <Typography variant="subtitle1">{location.name}</Typography>
        </Link>
        <LocationActions location={location}/>
    </div>
)
