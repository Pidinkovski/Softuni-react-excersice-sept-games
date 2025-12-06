import { useNavigate } from "react-router";
import { useContext } from "react";

import useRequest from "../../hooks/useRequest.js";
import useForm from "../../hooks/useForm.js";
import UserContext from "../../contexts/UserContext.jsx";

export default function Create() {

    const navigate = useNavigate()
    const { request } = useRequest()
    const { user } = useContext(UserContext)

    const { 
        data , formAction ,dataSetterHandler } = useForm(createGameHandler, {
        title : '',
        genre: '',
        players: '',
        date: '',
        imageUrl: '',
        summary: ''
    })

    async function createGameHandler(data) {
        if(!data.title || !data.genre || !data.date || !data.summary || !data.players) {
            return alert('All field are required')
        } 
        data.players = Number(data.players)

        try {
            const response = await request('http://localhost:3030/data/games', 'POST', data , user);
            
            navigate('/games')

        } catch (err) {
            alert('Theres an error with the creating', err.message)
        }

    }

    return (

        <section id="add-page">
            <form id="add-new-game" action={formAction}>
                <div className="container">
                    <h1>Add New Game</h1>
                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input 
                        type="text" 
                        id="gameName" 
                        onChange={dataSetterHandler}
                        value={data.title}
                        name="title" 
                        placeholder="Enter game title..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input 
                        type="text" 
                        id="genre" 
                        onChange={dataSetterHandler}
                        value={data.genre}
                        name="genre" 
                        placeholder="Enter game genre..."
                         />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input 
                        type="number" 
                        id="activePlayers" 
                        name="players" 
                        onChange={dataSetterHandler}
                        value={data.players}
                        min="0" 
                        placeholder="0"
                         />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input 
                        type="date" 
                        id="releaseDate" 
                        onChange={dataSetterHandler}
                        value={data.date}
                        name="date"
                         />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input 
                        type="text" 
                        id="imageUrl" 
                        onChange={dataSetterHandler}
                        value={data.imageUrl}
                        name="imageUrl" 
                        placeholder="Enter image URL..."
                         />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea 
                        name="summary" 
                        id="summary" 
                        onChange={dataSetterHandler}
                        value={data.summary}
                        rows="5" 
                        placeholder="Write a brief summary..."
                        ></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="ADD GAME" />
                </div>
            </form>
        </section>

    )
}