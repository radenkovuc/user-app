'use client'
import {useSnackbar} from '@mui/base/useSnackbar';
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import {Typography} from "@mui/material";

import {closeMessage, useAppDispatch, useAppSelector} from "@/src/store";

import classes from "./snackbar.module.css";

export const Snackbar = () => {
    const {isOpen, message} = useAppSelector(s => s.message)
    const dispatch = useAppDispatch();

    const {getRootProps, onClickAway} = useSnackbar({
        onClose: () => dispatch(closeMessage()),
        open: isOpen,
        autoHideDuration: 5000,
    });

    return (
        isOpen ? (
            <ClickAwayListener onClickAway={onClickAway}>
                <div
                    className={classes.snackbar}
                    {...getRootProps()}
                >
                    <Typography>{message}</Typography>
                </div>
            </ClickAwayListener>
        ) : null)
}