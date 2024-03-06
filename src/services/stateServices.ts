import {AppDispatch, resetData, setData, setDataByBate} from "@/src/store";
import {getData, getLocation, getSourceDataByDate} from "@/src/services/db";

import {DailyData, Data} from "@/src/domain";

export const loadLocationData = async (id: string, dispatch: AppDispatch) => {
    dispatch(resetData())

    const location = await getLocation(id)

    if (location) {
        const temperatureData: Data[] = await getData(location.temperature.id)
        const waterLevelData: Data[] = await getData(location.waterLevel.id)
        dispatch(setData([temperatureData, waterLevelData]))

        const temperatureDataByDate: DailyData[] = await getSourceDataByDate(location.temperature.id)
        const waterLevelDataByDate: DailyData[] = await getSourceDataByDate(location.waterLevel.id)
        dispatch(setDataByBate([temperatureDataByDate, waterLevelDataByDate]))
    }

}