"use client"

import {getData} from "@/src/services/ApiServices";
import {useEffect, useState} from "react";

type Data = {
    datetime: string
    value: number
}

const Home = () => {
    const [data, setData] = useState<Data[]>([])

    useEffect(() => {
        const loadData = async () => {
            const data: Data[] = await getData({url: "location"})
            setData(data)
        }

        void loadData()

    }, [])


    return (
        <>
            <div>Home</div>
            {data.map(d => <div key={d.datetime}>{d.datetime} - {d.value}</div>)}
        </>
    )
}

export default Home