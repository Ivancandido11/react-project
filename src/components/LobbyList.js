import React, { useState } from "react"
import Game from "./Game"
import CreateGameForm from "./CreateGameForm"
import "../App.css"

const LobbyList = ({ lobbies, onFormSubmit, onJoinGame, onSortClick, onViewGameClick }) => {
  const [showForm, setShowForm] = useState(false)

  const handleCreateGameClick = () => {
    setShowForm(showForm => !showForm)
  }

  const handleSortClick = (e) => {
    onSortClick(e.target.name)
  }

  return (
    <div className="main">
      <button onClick={handleCreateGameClick}>Create Game</button>
      {showForm ? <CreateGameForm onFormSubmit={onFormSubmit}/> : null}
      <table>
        <tbody>
          <tr>
            <th>
              <h3>Players  <button 
                  name="players"
                  onClick={handleSortClick}
                >Sort</button></h3>
            </th>
            <th>
              <h3>Title  <button 
                  name="title"
                  onClick={handleSortClick}
                >Sort</button></h3>
            </th>
            <th>
              <h3>Rank  <button 
                  name="rank"
                  onClick={handleSortClick}
                >Sort</button></h3>
            </th>
          </tr>
          {lobbies.map(lobby => 
            <Game
              id={lobby.id}
              key={lobby.id}
              onJoinGame={onJoinGame}
              onViewGameClick={onViewGameClick}
              players={lobby.players}
              rank={lobby.rank}
              title={lobby.title}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default LobbyList