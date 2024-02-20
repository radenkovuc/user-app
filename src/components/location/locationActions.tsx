"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Typography} from "@mui/material";

import {Location} from "@/src/domain/location";
import {updateSourceData} from "@/src/services/dbServices";
import Snackbar from "@/src/components/common/snackbar/snackbar";

interface Props {
    location: Location,
}

export const LocationActions = ({location}: Props) => {
    const [newData, setNewData] = useState<number | null>(null)
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
    };

    const onUpdate = async () => {
        const newData = await updateSourceData(location)
        setNewData(newData.new)
        setOpen(true)
        console.log('onUpdate')
        router.refresh()
    }

    return <div>
        <Button onClick={onUpdate}>
            <Typography>Update</Typography>
        </Button>
        <Snackbar handleClose={handleClose} open={open} newData={newData}/>
    </div>
}
