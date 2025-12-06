import { useState , useEffect} from "react"
import useRequest from "./useRequest"

export default function useFetchOnMount(url, initialState ) {
    const { request } = useRequest()
    const [currentData , setCurrentData] = useState(initialState)

    useEffect(() => {
        if(!url) return
        request(url)
        .then(result => setCurrentData(result))
        .catch(err => alert(err.message))
    } , [url])
    return {currentData ,setCurrentData }
}