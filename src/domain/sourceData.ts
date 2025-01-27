import {DailyData} from "./dailyData";
import {Data} from "./data";

export type SourceData = {
    dailyData: DailyData[],
    lastData: Data[]
}
