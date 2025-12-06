import { useContext } from "react"
import {  useParams } from "react-router"


import useRequest from "../../../hooks/useRequest.js"
import useForm from "../../../hooks/useForm.js"
import UserContext from "../../../contexts/UserContext.jsx"


export default function CreateComment({
    refresher
}) {
    const {id} = useParams()
    const {user} = useContext(UserContext)
    const {request} = useRequest()


    const {data , formAction ,dataSetterHandler } = useForm(onSubmitComment , {})

    async function onSubmitComment() {

        if(data.comment?.length < 5) {
            return alert('Comment should be at least 5 characters long')
        }
        const currentComment = {
            gameId : id,
            comment : data.comment
        }
        try {
            await request(`http://localhost:3030/data/comments`,'POST', currentComment , user);
            refresher()
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