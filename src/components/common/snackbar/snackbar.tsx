import {useSnackbar} from '@mui/base/useSnackbar';
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import {Typography} from "@mui/material";
import {motion} from "framer-motion"

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
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0, x: 200}}
                className={classes.snackbar}
                {...getRootProps()}
            >
                <Typography>{message}</Typography>
            </motion.div>
        </ClickAwayListener>
    )
}