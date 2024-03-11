import {
    AppDispatch,
    resetData,
    setDailyTemperatures,
    setDailyWaterLevels,
    setTemperatures,
    setWaterLevels
} from "@/store";
import {getData, getLocation, getSourceDataByDate} from "@/services/db";

import {DailyData, Data} from "@/domain";

export const loadLocationData = async (id: string, dispatch: AppDispatch) => {
    dispatch(resetData())

    const location = await getLocation(id)

    if (location) {
        const temperatureData: Data[] = await getData(location.temperature.id)
        dispatch(setTemperatures(temperatureData))

        const waterLevelData: Data[] = await getData(location.waterLevel.id)
        dispatch(setWaterLevels(waterLevelData))

        const temperatureDataByDate: DailyData[] = await getSourceDataByDate(location.temperature.id)
        dispatch(setDailyTemperatures(temperatureDataByDate))

        const waterLevelDataByDate: DailyData[] = await getSourceDataByDate(location.waterLevel.id)
        dispatch(setDailyWaterLevels(waterLevelDataByDate))

    }

}