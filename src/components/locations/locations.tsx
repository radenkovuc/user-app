import {getLocations} from "@/src/services/dbServices";
import {Location} from "@/src/domain/location";

import {SingleLocation} from "./location";
import classes from "./locations.module.css";

export const Locations = async () => {
    const locations: Location[] = await getLocations()

    return <div className={classes.locations}>
        {locations.map(location =>
            <SingleLocation key={location._id.toString()} location={location}/>)}
    </div>
}
