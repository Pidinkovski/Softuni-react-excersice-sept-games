import { useEffect , useState } from "react";
import requester from "../../../utils/requester.js";
import { useParams } from "react-router";

export default function CommentsList({
    refresh
}) {
    const {id} = useParams()
    const [comments , setComments] = useState([]);

    useEffect(() => {
        async function getComments() {
            try{
            const allcoments = await requester(`http://localhost:3030/jsonstore/games/${id}/comments`);
            setComments(allcoments ? Object.values(allcoments) : [])
            }catch(err) {
                alert(err.message)
            }
            
            
        }
        getComments()
    } ,[id , refresh])
    return (

        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
               {comments.map(coment => <li key={coment._id}className="comment">
                    <p>{coment.email}: {coment.context}!</p>
                </li>)}
                {comments.length === 0 &&  <p className="no-comment">No comments.</p>} 
            </ul>
        </div>
    )
}