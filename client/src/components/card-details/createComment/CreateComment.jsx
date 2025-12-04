import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router"

import UserContext from "../../../contexts/userContext.js"
import useRequest from "../../../hooks/useRequest.js"

export default function CreateComment() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [coment , setComment] = useState({})
    const {user} = useContext(UserContext)
    const {request} = useRequest()

    function onChangeData(e) {
        e.preventDefault()
        setComment(state => ({
            ...state,
            [e.target.name] : e.target.value
        }))
    }

    async function onSubmitComment() {

        if(coment.comment.length < 5) {
            return alert('Comment should be at least 5 characters long')
        }
        const currentComment = {
            gameId : id,
            comment : coment.comment
        }
        console.log(currentComment);
        
        try {
            await request(`http://localhost:3030/data/comments`,'POST', currentComment , user);

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
                        value={coment.comment}
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