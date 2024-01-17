import {getLocationData} from "@/src/services/LocationServices";
import {Data} from "@/src/domain/Data";

const Home = async () => {
    const data: Data[] = await getLocationData()

    return (
        <>
            <div>Home</div>
            {data.map(d => <div key={d.datetime}>{d.datetime} - {d.value}</div>)}
        </>
    )
}

export default Home