import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import requester from "../../utils/requester.js"

export default function CardDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [game, setGame] = useState({})

    useEffect(() => {
        async function getGameDetails() {
            try {
                const data = await requester(`http://localhost:3030/jsonstore/games/${id}`);
                setGame(data)

            } catch (err) {
                alert(err.message)
            }
        }
        getGameDetails()
    }, [id])

     async function deleteClickHandler(e ) {
        e.preventDefault()
        const result = confirm(`Would  you like to delete ${game.title}`);

        if(!result) {
            return;
        }

        try {
           await requester(`http://localhost:3030/jsonstore/games/${id}`, 'Delete')
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
                    <img className="game-img" src={game.imageUrl} alt={game.title} />

                    <div className="meta-info">
                        <h1 className="game-name">{game.title}</h1>

                        <p className="data-row">
                            <span className="label">Genre:</span>
                            <span className="value">{game.genre}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Active Players:</span>
                            <span className="value">{game.players}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Release Date:</span>
                            <span className="value">{game.date}</span>
                        </p>
                    </div>
                    <div className="summary-section">
                        <h2>Summary:</h2>
                        <p className="text-summary">
                            {game.summary}
                        </p>
                    </div>
                </div>


                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <Link to={`/games/${id}/edit`} className="button">Edit</Link>
                    {/* <Link to={`/games/${id}/delete`} className="button">Delete</Link> */}
                    <button onClick={deleteClickHandler} className="button">Delete</button>
                </div>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <li className="comment">
                            <p>Content: A masterpiece of world design, though the boss fights are brutal.</p>
                        </li>
                        <li className="comment">
                            <p>Content: Truly feels like a next-gen evolution of the Souls formula!</p>
                        </li>
                    </ul>
                    {/* <!-- Display paragraph: If there are no games in the database -->
                    <!-- <p className="no-comment">No comments.</p> --> */}
                </div>

            </div>
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>

    )
}