import { useEffect, useState } from "react";

import GameCard from "../game-card/GameCard";
import useFetchOnMount from "../../hooks/useFetchOnMount";

export default function Catalog() {

    const { currentData : games } = useFetchOnMount("http://localhost:3030/data/games" , [])
    
    return (

        <section id="catalog-page">
            <h1>Catalog</h1>
            <div className="catalog-container">
                {games?.length > 0
                    ? games.map((game) => <GameCard key={game._id} {...game} />)
                    : <h3 className="no-articles">No Added Games Yet</h3>}
            </div>
        </section>


    )
}