'use client'
import {LineChart} from '@mui/x-charts/LineChart';

import {DailyData} from "@/src/domain/dailyData";

interface Props {
    dataByDate: DailyData[]
}

const parseValue = (data: string): number | null => {
    const value = Number.parseFloat(data)
    return value < -1000 ? null : value
}

export const DailyChart = ({dataByDate}: Props) => {
    return (
        <LineChart
            xAxis={[{scaleType: 'point', data: dataByDate.map(d => d.date.substring(5))}]}
            series={[
                {data: dataByDate.map(d => parseValue(d.max_value)), label: "max", color: "red", showMark: false},
                {data: dataByDate.map(d => parseValue(d.min_value)), label: "min", showMark: false},
            ]}
            height={400}
        />
    )
}

