import { useEffect, useState } from "react"

import GameCard from "../game-card/GameCard"
import objectIdTranform from '../../utils/objectIdTransform.js'

export default function Home() {

    const [lastGames,setLastGames] = useState([])

    useEffect(  () => {
        async function fetchData() {
        const response = await fetch('http://localhost:3030/jsonstore/games');
        const data = await response.json()
            const dataArray = objectIdTranform(data).sort((a , b ) => b._createdOn - a._createdOn)
            .slice(0,3)
            setLastGames(dataArray)}
            fetchData()
        } , [])

    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in </h3>
                <img id="logo-left" src="./images/logo.png" alt="logo" />
            </div>

            <div id="home-page">
                <h1>Latest Games</h1>
                <div id="latest-wrap">
                    <div className="home-container">
                        { lastGames.length > 0 
                        ? lastGames.map(game => <GameCard key={game.id}{...game}/>)
                        : <p className="no-articles">No games yet</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}