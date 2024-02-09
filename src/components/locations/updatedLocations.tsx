import {Typography} from "@mui/material";

import {UpdatedLocation} from "@/src/domain/updatedLocation";

interface Props {
    locations: UpdatedLocation[]
}

export const UpdatedLocations = ({locations}: Props) => {
    return <div>
        {locations.map((l, k) => <Typography key={k}>{l.name} - new: {l.new}, old: {l.old}</Typography>)}
    </div>
}
