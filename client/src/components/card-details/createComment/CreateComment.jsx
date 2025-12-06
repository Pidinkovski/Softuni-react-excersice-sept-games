import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router"


import useRequest from "../../../hooks/useRequest.js"
import useForm from "../../../hooks/useForm.js"
import UserContext from "../../../contexts/userContext.jsx"

export default function CreateComment() {
    const {id} = useParams()
    const {user} = useContext(UserContext)
    const {request} = useRequest()


    const {data , formAction ,dataSetterHandler, setData } = useForm(onSubmitComment , {})

    async function onSubmitComment() {

        if(data.comment?.length < 5) {
            return alert('Comment should be at least 5 characters long')
        }
        const currentComment = {
            gameId : id,
            comment : data.comment
        }
        try {
            const cas = await request(`http://localhost:3030/data/comments`,'POST', currentComment , user);
            setData(cas)
        }catch(err) {
            alert(err.message)
        }
    }
    return (
        <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" action={formAction}>
                    <textarea 
                        name="comment" 
                        placeholder="Comment......"
                        onChange={dataSetterHandler}
                        value={data.comment}
                    ></textarea>
                    <input 
                        className="btn submit" 
                        type="submit"
                        placeholder="Add Comment"
                     />
                </form>
            </article>
    )
}