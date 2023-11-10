import {useCallback, useEffect, useState} from 'react'
import {axios} from '../utils/axios'

const useFetchData = ({url, ...rest}) => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)
    const [data, setData] = useState({})

    const fetchPost = async () => {
        setLoading(true)
        try {
            const response = await axios.post(url, {
                ...rest,
            })
            setData(response.data)
        } catch (e) {
            console.log('error', e)
            setError(e?.response?.data?.detail)
        }

        setLoading(false)
    }

    const debouncedFetch = useCallback(fetchPost, [])

    useEffect(() => {
        debouncedFetch()
    }, [url, debouncedFetch])

    return {isLoading, error, data}
}

export default useFetchData
