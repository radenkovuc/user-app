'use client'

import {AnimatePresence, motion} from "framer-motion"

import {closeMessage, useAppDispatch, useAppSelector} from "@/store";

import {Snackbar} from "./snackbar";

import classes from "./snackbar.module.css";

export const Messages = () => {
    const {messages} = useAppSelector(s => s.message)
    const dispatch = useAppDispatch();

    return <motion.div className={classes.messages} layout="preserve-aspect">
        <AnimatePresence>
            {messages.map(m => <Snackbar key={m.id} message={m.text} onClose={() => dispatch(closeMessage(m.id))}/>)}
        </AnimatePresence>
    </motion.div>
}