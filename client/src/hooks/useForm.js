import { useEffect, useState } from "react";

export default function useForm(callback , initialValues) {

    const [data , setData] = useState(initialValues);

    const dataSetterHandler = (e) => {
        setData(state => ({
            ...state,
            [e.target.name] : e.target.value
        }));
    }

    const formAction = (formData) => {
        callback(data , formData)
    }

    return {
        data,
        dataSetterHandler ,
        formAction,
        setData
    }
}