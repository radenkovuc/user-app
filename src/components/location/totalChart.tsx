import {LineChart} from '@mui/x-charts/LineChart';

import {Data} from "@/domain";

const mapData = (data: Data[]): number[] => {
    let lastValue = 0
    return data.map(d => {
        if (d.value < -1000) {
            return lastValue
        }

        lastValue = d.value
        return d.value;
    })
}

interface Props {
    data: Data[]
}

export const TotalChart = ({data}: Props) => (
    <LineChart
        xAxis={[{scaleType: 'point', data: data.map(d => d.datetime.substring(5))}]}
        series={[
            {
                data: mapData(data), label: "value",
                showMark: false
            },
        ]}
        height={400}
    />
)

