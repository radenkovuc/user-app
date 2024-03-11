import {LineChart} from '@mui/x-charts/LineChart';

import {Data} from "@/domain";

interface Props {
    data: Data[]
}

export const TotalChart = ({data}: Props) => (
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

