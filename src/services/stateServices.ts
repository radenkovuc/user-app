import {AppDispatch, resetData, setLocationData} from "@/store";
import {getLocation, getLocationData} from "@/services/db";

export const loadLocationData = async (id: string, dispatch: AppDispatch) => {
    dispatch(resetData())

    const location = await getLocation(id)

    if (location) {
        const locationData = await getLocationData(location.id)
        if (locationData) {
            dispatch(setLocationData(locationData))

        }
    }

}
