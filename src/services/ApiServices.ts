interface GetDataProps {
    url: string,
    params?: any
}

export const getData = async <T>({params, url}: GetDataProps): Promise<T[]> => {
    const result = await fetch(`${process.env.URL || process.env.VERCEL_URL}/api/${url}`);
    return await result.json()
}