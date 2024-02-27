'use client'

import {closeMessage, useAppDispatch, useAppSelector} from "@/src/store";

import {Snackbar} from "./snackbar";

import classes from "./snackbar.module.css";

export const Messages = () => {
    const {messages} = useAppSelector(s => s.message)
    const dispatch = useAppDispatch();

    return <div className={classes.messages}>
        {messages.map(m => <Snackbar key={m.id} message={m.text} onClose={() => dispatch(closeMessage(m.id))}/>)}
    </div>
}