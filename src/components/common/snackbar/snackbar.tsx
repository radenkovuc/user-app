import {useSnackbar} from '@mui/base/useSnackbar';
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import {Typography} from "@mui/material";

import classes from "./snackbar.module.css";

interface Props {
    message: string,
    onClose: () => void
}

export const Snackbar = ({message, onClose}: Props) => {
    const {getRootProps, onClickAway} = useSnackbar({
        onClose,
        open: true,
        autoHideDuration: 5000,
    });

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div
                className={classes.snackbar}
                {...getRootProps()}
            >
                <Typography>{message}</Typography>
            </div>
        </ClickAwayListener>
    )
}