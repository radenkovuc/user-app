import {getData} from "@/src/services/ApiServices";

type Data = {
    datetime: string
    value: number
}

const Home = async () => {
    const data: Data[] = await getData({url: "location"})

    return (
        <>
            <div>Home</div>
            {data.map(d => <div key={d.datetime}>{d.datetime} - {d.value}</div>)}
        </>
    )
}

export default Home