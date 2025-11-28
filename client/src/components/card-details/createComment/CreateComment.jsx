import { useState } from "react"
import { useNavigate, useParams } from "react-router"

import requester from "../../../utils/requester.js"

export default function CreateComment({
    user,
    forceRef
}) {
    const navigate = useNavigate()
    const {id} = useParams()
    const [comment , setComment] = useState({})

    function onChangeData(e) {
        e.preventDefault()
        setComment(state => ({
            ...state,
            [e.target.name] : e.target.value
        }))
    }

    async function onSubmitComment() {

        if(comment.comment.length < 5) {
            return alert('Comment should be at least 5 characters long')
        }
        const currentComment = {
            email : user.email,
            context : comment.comment
        }
        try {
            await requester(`http://localhost:3030/jsonstore/games/${id}/comments`,'POST', currentComment);
             forceRef()
        }catch(err) {
            alert(err.message)
        }
    }
    return (
        <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" action={onSubmitComment}>
                    <textarea 
                        name="comment" 
                        placeholder="Comment......"
                        onChange={onChangeData}
                        value={comment.comment}
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