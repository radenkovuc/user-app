import MUISnackbar from '@mui/material/Snackbar';
import {Typography} from "@mui/material";
import {motion} from "framer-motion"

import classes from "./snackbar.module.css";

interface Props {
    message: string,
    onClose: () => void
}

export const Snackbar = ({message, onClose}: Props) => {

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0, x: 200}}
            className={classes.container}
        >
            <MUISnackbar
                onClose={onClose}
                open
                autoHideDuration={5000}
                className={classes.snackbar}>
                <Typography>{message}</Typography>
            </MUISnackbar>
        </motion.div>

    )
}
