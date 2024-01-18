import Link from "next/link";

import {Location} from "@/src/domain/location";

import {LocationActions} from "./locationActions";
import classes from "./locations.module.css";

interface Props {
    location: Location
}

export const SingleLocation = ({location}: Props) => (
    <div className={classes.location}>
        <Link className={classes.locationLink} href={`/location/${location._id}`}>
            {location.name}
        </Link>
        <LocationActions id={location._id.toString()}/>
    </div>
)
