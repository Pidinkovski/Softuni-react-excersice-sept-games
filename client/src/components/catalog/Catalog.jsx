import { useEffect , useState } from "react";

import GameCard from "../game-card/GameCard";
import objectIdTranform from "../../utils/objectIdTransform.js";

export default function Catalog() {

    const [games , setGames] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3030/jsonstore/games');
            const result = await response.json()

            const dataArray = objectIdTranform(result)
            setGames(dataArray)

        }
        fetchData()
    }, [])

    return (

        <section id="catalog-page">
            <h1>Catalog</h1>
            <div className="catalog-container">
            {games.length > 0 
            ? games.map((game) => <GameCard key={game.id} {...game}/>)
            : <h3 className="no-articles">No Added Games Yet</h3>}
            </div>
        </section>


    )
}