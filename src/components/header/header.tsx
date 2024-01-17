import Link from "next/link";

import classes from "./header.module.css";

interface Props {
    title: string
}

export const Header = ({title}: Props) =>
    <div className={classes.container}>
        <Link className={classes.link} href='/'>Home</Link>
        <div className={classes.title}>{title}</div>
    </div>