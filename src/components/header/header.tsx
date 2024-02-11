import Link from "next/link";
import {Typography} from "@mui/material";
import React from "react";

import classes from "./header.module.css";

interface Props {
    title: string
    actions?: React.JSX.Element
}

export const Header = ({title, actions}: Props) =>
    <div className={classes.container}>
        <Link className={classes.link} href='/'>Home</Link>
        <div className={classes.headerContainer}>
            <Typography variant="h4" className={classes.title}>{title}</Typography>
            {actions}
        </div>
    </div>