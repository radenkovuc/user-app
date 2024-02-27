import {AppDispatch, setData, setDataByBate,resetData} from "@/src/store";
import {getSourceData, getSourceDataByDate} from "@/src/services/dbServices";

import {DailyData as DData} from "@/src/domain/dailyData";
import {Data} from "@/src/domain/data";

export const loadLocationData = async (id: string, dispatch: AppDispatch) => {
    dispatch(resetData())

    const dataByDate: DData[] = await getSourceDataByDate(id)
    dispatch(setDataByBate(dataByDate))

    const data: Data[] = await getSourceData(id)
    dispatch(setData(data))
}