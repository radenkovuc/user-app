import {LineChart} from '@mui/x-charts/LineChart';

import {DailyData} from "@/src/domain";

const parseValue = (data: string): number | null => {
    const value = Number.parseFloat(data)
    return value < -1000 ? null : value
}

interface Props {
    data: DailyData[]
}

export const DailyChart = ({data}: Props) => (
    <LineChart
        xAxis={[{scaleType: 'point', data: data.map(d => d.date.substring(5))}]}
        series={[
            {data: data.map(d => parseValue(d.max_value)), label: "max", color: "red", showMark: false},
            {data: data.map(d => parseValue(d.min_value)), label: "min", showMark: false},
        ]}
        height={400}
    />
)

