import {useSnackbar} from '@mui/base/useSnackbar';
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import {Typography} from "@mui/material";

import classes from "./snackbar.module.css";

interface Props {
    newData: number | null
    open: boolean
    handleClose: () => void
}

export default function Snackbar({newData, open, handleClose}: Props) {
    const {getRootProps, onClickAway} = useSnackbar({
        onClose: handleClose,
        open,
        autoHideDuration: 5000,
    });

    return (
        open ? (
            <ClickAwayListener onClickAway={onClickAway}>
                <div
                    className={classes.snackbar}
                    {...getRootProps()}
                >
                    <Typography>{newData ? `Added ${newData} new data` : "No new data"}</Typography>
                </div>
            </ClickAwayListener>
        ) : null)
}