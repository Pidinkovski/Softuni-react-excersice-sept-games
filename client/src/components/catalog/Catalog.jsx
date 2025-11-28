import { useEffect, useState } from "react";

import GameCard from "../game-card/GameCard";
import objectIdTranform from "../../utils/objectIdTransform.js";
import requester from "../../utils/requester.js"

export default function Catalog() {

    const [games, setGames] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await requester('http://localhost:3030/jsonstore/games');

                const dataArray = objectIdTranform(result)
                setGames(dataArray)
            }catch(err) {
                alert(err.message)
            }
   
        }
        fetchData()
    }, [])

    return (

        <section id="catalog-page">
            <h1>Catalog</h1>
            <div className="catalog-container">
                {games.length > 0
                    ? games.map((game) => <GameCard key={game.id} {...game} />)
                    : <h3 className="no-articles">No Added Games Yet</h3>}
            </div>
        </section>


    )
}