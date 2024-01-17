interface GetDataProps {
    url: string,
    params?: any
}

export const getData = async <T>({ url}: GetDataProps): Promise<T[]> => {
    const result = await fetch(`/api/${url}`);
    return await result.json()
}