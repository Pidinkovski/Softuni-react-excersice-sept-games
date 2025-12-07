import { useContext } from "react";
import UserContext from "../contexts/UserContext";




export default function useRequest() {

    const {isAuthenticated , user} = useContext(UserContext)


    const  request = async(url, method = 'GET', data ,config = {} ) =>{
        
        
        
        const options = {
            method,
            headers: {}
        };

        if (method !== 'GET' && data !== undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
        

        if(config?.accessToken) {
            const token = config?.accessToken
            options.headers = {
                ...options.headers,
                ['X-Authorization'] : token
            }
        }
        const response = await fetch(url, options);

         if (response.status === 204) {
            return null;
        }
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }
    

        return response.json();
    }
    return { request }
}