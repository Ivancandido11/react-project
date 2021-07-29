/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Game from "./Game"
import CreateGameForm from "./CreateGameForm"
import "../App.css"

const LobbyList = ({ lobbies, onFormSubmit, onJoinGame, onSortClick, onViewGameClick, user }) => {
  const [showForm, setShowForm] = useState(false)

  const handleCreateGameClick = () => {
    setShowForm(showForm => !showForm)
  }

  const handleSortClick = (e) => {
    onSortClick(e.target.name)
  }

  return (
    <div className="main">
      <h2>
        {user ? `${user.name}: ${user.points} points earned` : null}
      </h2>
      <button onClick={handleCreateGameClick}>Create Game</button>
      {showForm
        ? <CreateGameForm
          onFormSubmit={onFormSubmit}
          user={user}
      />
        : null}
      <div className="divTable">
        <table className="lobbyTable">
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
              <th>
                <h3>Action</h3>
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
    </div>
  )
}

export default LobbyList
