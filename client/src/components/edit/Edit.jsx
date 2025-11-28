import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import requester from "../../utils/requester.js"

const initialValues = {
    title : '',
    genre : '',
    players : '',
    date : '',
    imageUrl : '',
    summary : ''
}
export default function Edit() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [data , setData] = useState(initialValues)

    function onDataChangeHandler(e) {
        setData((state) => ({
            ...state,
            [e.target.name] : e.target.value
        }))
    }

    useEffect(() => {
        async function getData() {
            const currentData = await requester(`http://localhost:3030/jsonstore/games/${id}`)
            setData(currentData);
        }
        getData()
    } ,[id])

    async function onEditHandler() {
        if(!data.date || !data.genre || !data.imageUrl || !data.players || !data.summary || !data.title) {
            return alert('All fields are required')
        }
        try {
            await requester(`http://localhost:3030/jsonstore/games/${id}`, 'PUT' , data);
            navigate(`/games/${id}/details`)
        } catch(err) {
            alert(err.message)
        }
        


    }
    return (
                <section id="edit-page">
            <form id="add-new-game" action={onEditHandler}>
                <div className="container">

                    <h1>Edit Game</h1>

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input 
                            type="text" 
                            id="gameName" 
                            name="title"
                            value={data.title}
                            onChange={onDataChangeHandler}
                            placeholder="Enter game title..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input 
                            type="text" 
                            id="genre" 
                            name="genre"
                            value={data.genre}
                            onChange={onDataChangeHandler}
                            placeholder="Enter game genre..."
                        /> 
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input 
                            type="number" 
                            id="activePlayers" 
                            name="players"
                            value={data.players}
                            onChange={onDataChangeHandler}
                            min="0" 
                            placeholder="0"/>
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date" 
                            id="releaseDate"
                            value={data.date}
                            onChange={onDataChangeHandler}
                            name="date"
                         />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input 
                            type="text" 
                            id="imageUrl" 
                            name="imageUrl"
                            value={data.imageUrl}
                            onChange={onDataChangeHandler}
                            placeholder="Enter image URL..."
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea 
                            name="summary" 
                            id="summary" 
                            rows="5"
                            value={data.summary}
                            onChange={onDataChangeHandler}
                            placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="EDIT GAME"/>
                </div>
            </form>
        </section>

    )
}