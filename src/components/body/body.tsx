import classes from "./body.module.css";
import {ReactNode} from "react";

interface Props {
    children: ReactNode
}

export const Body = ({children}: Props) =>
    <div className={classes.container}>
        {children}
    </div>