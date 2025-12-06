import { useContext } from "react"
import { Link, useNavigate, useParams } from "react-router"

import CreateComment from "./createComment/CreateComment.jsx"
import CommentsList from "./comments/CommentsList.jsx"
import useRequest from "../../hooks/useRequest.js"

import useFetchOnMount from "../../hooks/useFetchOnMount.js"
import IsOwner from "../../utils/isOwnerUtil.js"
import UserContext from "../../contexts/UserContext.jsx"


export default function CardDetails() {
    const { id } = useParams()
    
    const navigate = useNavigate()
    const {request} = useRequest()
    const {user} = useContext(UserContext)

    const {currentData : game} = useFetchOnMount(`http://localhost:3030/data/games/${id}` , {
        title : "",
        genre : "",
        imageUrl : "",
        date : "",
        players : 0,
        summary : "",
    })

  
        const isAuthor = IsOwner(user , game)
    

     async function deleteClickHandler(e) {
        e.preventDefault()
        const result = confirm(`Would  you like to delete ${game?.title}`);

        if(!result) {
            return;
        }

        try {
           await request(`http://localhost:3030/data/games/${id}`, 'Delete' ,{} , user)
            navigate('/')

        } catch(err) {
            alert('Count not delete' , err.message)
        }
    }
    return (

        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="header-and-image">
                    <img className="game-img" src={game.imageUrl || null} alt={game?.title} />

                    <div className="meta-info">
                        <h1 className="game-name">{game?.title}</h1>

                        <p className="data-row">
                            <span className="label">Genre:</span>
                            <span className="value">{game?.genre}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Active Players:</span>
                            <span className="value">{game?.players}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Release Date:</span>
                            <span className="value">{game?.date}</span>
                        </p>
                    </div>
                    <div className="summary-section">
                        <h2>Summary:</h2>
                        <p className="text-summary">
                            {game?.summary}
                        </p>
                    </div>
                </div>


                {isAuthor && 
                <div className="buttons">
                    <Link to={`/games/${id}/edit`} className="button">Edit</Link>
                    {/* <Link to={`/games/${id}/delete`} className="button">Delete</Link> */}
                    <button onClick={deleteClickHandler} className="button">Delete</button>
                </div>}
                

            <CommentsList  />

            </div>
            {!isAuthor && user && <CreateComment  user={user}/>}
           
        </section>

    )
}