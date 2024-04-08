import {Typography} from "@mui/material";

import classes from "./location.module.css";

interface Props {
    value?: string | number,
    title: string,
    sign: string
}

export const LocationData = ({title, value, sign}: Props) =>
    <Typography className={classes.value}>${title}: {value ? `${value} ${sign}` : "Loading..."}</Typography>

