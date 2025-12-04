import { useContext , useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import useForm from "../../hooks/useForm.js"
import useRequest from "../../hooks/useRequest.js"
import UserContext from "../../contexts/userContext.js"
import useFetchOnMount from "../../hooks/useFetchOnMount.js"

const initialValues = {
    title: '',
    genre: '',
    players: '',
    date: '',
    imageUrl: '',
    summary: ''
}
export default function Edit() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { request } = useRequest()
    const { user } = useContext(UserContext)

    const {
        dataSetterHandler,
        formAction,
        data,
        setData
    } = useForm(onEditHandler, initialValues)

    const { currentData } = useFetchOnMount(`http://localhost:3030/data/games/${id}`)

    useEffect(() => {
        if (currentData) {
            setData(currentData);
        }
    }, [currentData]);


    async function onEditHandler(data) {
        if (!data.date || !data.genre || !data.imageUrl || !data.players || !data.summary || !data.title) {
            return alert('All fields are required')
        }
        try {
            await request(`http://localhost:3030/data/games/${id}`, 'PUT', data, user);
            navigate(`/games/${id}/details`)
        } catch (err) {
            alert(err.message)
        }
    }
    return (
        <section id="edit-page">
            <form id="add-new-game" action={formAction}>
                <div className="container">

                    <h1>Edit Game</h1>

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input
                            type="text"
                            id="gameName"
                            name="title"
                            value={data.title}
                            onChange={dataSetterHandler}
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
                            onChange={dataSetterHandler}
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
                            onChange={dataSetterHandler}
                            min="0"
                            placeholder="0" />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            value={data.date}
                            onChange={dataSetterHandler}
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
                            onChange={dataSetterHandler}
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
                            onChange={dataSetterHandler}
                            placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="EDIT GAME" />
                </div>
            </form>
        </section>

    )
}