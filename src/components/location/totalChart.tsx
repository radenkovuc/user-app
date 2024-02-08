'use client'
import {LineChart} from '@mui/x-charts/LineChart';
import {Data} from "@/src/domain/data";

interface Props {
    data: Data[]
}

const parseValue = (data: string): number | null => {
    const value = Number.parseFloat(data)
    return value < -1000 ? null : value
}

export const TotalChart = ({data}: Props) => {
    return (
        <LineChart
            xAxis={[{scaleType: 'point', data: data.map(d => d.datetime.substring(5))}]}
            series={[
                {
                    data: data.map(d => d.value < -1000 ? null : d.value), label: "value",
                    showMark: false
                },
            ]}
            height={400}
        />
    )
}

