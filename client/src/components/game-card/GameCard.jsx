import { Link } from "react-router"

export default function GameCard({
    title,
    genre,
    imageUrl, 
    id,

}) {
    return (
            <div className="game">
                <img src={imageUrl} alt={title}/>
                <div className="details-overlay">
                    <p className="name">{title}</p>
                    <p className="genre">{genre}</p>
                    <Link to={`/games/${id}/edit`} className="details-button">Details</Link>
                </div>
            </div>

    )
}