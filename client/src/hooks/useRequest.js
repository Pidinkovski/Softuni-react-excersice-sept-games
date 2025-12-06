import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";




export default function useRequest() {

    const {isAuthenticated , user} = useContext(UserContext)

    const  request = async(url, method = 'GET', data , config = {}) =>{

        const options = {
            method,
            headers: {}
        };

        if (method !== 'GET' && data !== undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
        if(config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                ['X-Authorization'] : config.accessToken || user.accessToken
            }
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }
        if (response.status === 204) {
            return null;
        }

        return response.json();
    }
    return { request }
}