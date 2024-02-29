import {getLocations} from "@/src/services/db";
import {Location} from "@/src/domain";

import {SingleLocation} from "./location";

import classes from "./locations.module.css";

export const Locations = async () => {
    const locations: Location[] = await getLocations()

    return <div className={classes.locations}>
        {locations.map(location =>
            <SingleLocation key={location.id} location={location}/>)}
    </div>
}
