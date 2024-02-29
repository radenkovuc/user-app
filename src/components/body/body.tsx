import {ReactNode} from "react";

import classes from "./body.module.css";

interface Props {
    children: ReactNode
}

export const Body = ({children}: Props) =>
    <div className={classes.container}>
        {children}
    </div>