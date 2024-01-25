import Link from "next/link";
import {Typography} from "@mui/material";

import classes from "./header.module.css";

interface Props {
    title: string
}

export const Header = ({title}: Props) =>
    <div className={classes.container}>
        <Link className={classes.link} href='/'>Home</Link>
        <Typography variant="h4" className={classes.title}>{title}</Typography>
    </div>