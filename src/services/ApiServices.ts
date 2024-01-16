import axios from "axios";

interface GetDataProps {
    url: string,
    params?: any
}

export const getData = async <T>({params, url}: GetDataProps): Promise<T[]> => {
    const result = await axios.get<T[]>(`${process.env.URL || process.env.VERCEL_URL}/api/${url}`, {params});
    return result.data
}