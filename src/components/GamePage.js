import React from "react"
import { useParams } from "react-router-dom"

const GamePage = ({ lobbies, onFinishGameClick }) => {
  const params = useParams()

  const currentLobby = lobbies.filter(lobby => lobby.id === parseInt(params.id))

  const playersInGame = currentLobby[0].players.filter(player => player !== "")

  const displayPlayers = () => (
    currentLobby[0].players.map((player, index) => {
      if (player) {
        return (
          <h3 
            key={index} 
            className={`player${index + 1}`}
          >{player}</h3>
        )
      } else {
        return (
          <h3 
            key={index} 
            className={`player${index + 1}`}
          >Missing Player</h3>
        )
      }
    })
  )

  const handleDeleteClick = () => {
    onFinishGameClick(params.id)
  }

  return (
    <div className="mainGamePage">
      <div className="gamePage">
        {displayPlayers()}
        <img 
          src="http://i.imgur.com/MZKZOle.jpg" 
          alt="Catan Board"
          className="board"
        />
      </div>
      {playersInGame.length === 4 ? <button onClick={handleDeleteClick}>Finish Game</button> : null}
    </div>
  )
}

export default GamePage