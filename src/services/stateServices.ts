import {
    AppDispatch,
    resetData,
    setDailyTemperatures,
    setDailyWaterLevels,
    setTemperatures,
    setWaterLevels
} from "@/store";
import {getLocation, getLocationData, getSourceDataByDate} from "@/services/db";

import {DailyData, Data} from "@/domain";

export const loadLocationData = async (id: string, dispatch: AppDispatch) => {
    dispatch(resetData())

    const location = await getLocation(id)

    if (location) {
        const temperatureData: Data[] = await getLocationData(location.temperature)
        dispatch(setTemperatures(temperatureData))

        const waterLevelData: Data[] = await getLocationData(location.waterLevel)
        dispatch(setWaterLevels(waterLevelData))

        const temperatureDataByDate: DailyData[] = await getSourceDataByDate(location.temperature.id)
        dispatch(setDailyTemperatures(temperatureDataByDate))

        const waterLevelDataByDate: DailyData[] = await getSourceDataByDate(location.waterLevel.id)
        dispatch(setDailyWaterLevels(waterLevelDataByDate))

    }

}