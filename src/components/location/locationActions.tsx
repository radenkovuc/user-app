"use client"

import {useRouter} from "next/navigation";
import {Button, Typography} from "@mui/material";

import {Location} from "@/src/domain/location";
import {updateSourceData} from "@/src/services/dbServices";
import {loadLocationData} from "@/src/services/stateServices";
import {showMessage, useAppDispatch} from "@/src/store";

interface Props {
    location: Location,
}

export const LocationActions = ({location}: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const onUpdate = async () => {
        const newData = await updateSourceData(location)
        console.log('onUpdate')
        void loadLocationData(location.id, dispatch)
        dispatch(showMessage(newData.new ? `Added ${newData.new} new data` : "No new data"))
        router.refresh()
    }

    return <div>
        <Button onClick={onUpdate}>
            <Typography>Update</Typography>
        </Button>
    </div>
}
