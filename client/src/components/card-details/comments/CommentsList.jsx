import { useEffect , useState } from "react";
import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest";


export default function CommentsList() {
    const {id} = useParams()
    const [comments , setComments] = useState([]);
    const {request} = useRequest()

    useEffect(() => {
        async function getComments() {
            
            try{
            const allcoments = await request(`http://localhost:3030/data/comments?where=gameId%3D%22${id}%22&load=author%3D_ownerId%3Ausers`);
            console.log(allcoments);
            
            setComments(allcoments ? allcoments : [])
            }catch(err) {
                alert(err.message)
            }
            
            
        }
        getComments()
    } ,[id ])
    return (

        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
               {comments.map(coment => <li key={coment._id}className="comment">
                    <p>{coment.author?.email}: {coment.comment}!</p>
                </li>)}
                {comments.length === 0 &&  <p className="no-comment">No comments.</p>} 
            </ul>
        </div>
    )
}