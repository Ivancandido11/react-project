import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav"
import LobbyList from "./LobbyList";
import Leaderboards from "./Leaderboards";
import Home from "./Home";
import "../App.css"

function App() {
  const [lobbies, setLobbies] = useState([])
  const [user, setUser] = useState("")
  const URL = "http://localhost:4000/lobbies/"

  useEffect(() => {
    fetch(URL)
      .then(r => r.json())
      .then(data => setLobbies(data))
  })

  const handleCreateGameFormSubmit = (newGame) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGame)
    }
    fetch(URL, configObj)
      .then(r => r.json())
      .then(data => setLobbies([...lobbies, data]))
  }

  const handleJoinGame = (id, players) => {
    const playersObj = {
      players: [...players, user]
    }
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(playersObj)
    }
    fetch(`${URL}${id}`, configObj)
      .then(r => r.json())
      .then(data => {
        const updatedLobbies = lobbies.map(lobby => {
          if(lobby.id === data.id) return data
          else return lobby
        })
        setLobbies(updatedLobbies)
      })
  }

  const handleSignIn = (username) => {
    setUser(username)
  }

  const handleSignOut = () => {
    setUser("")
  }

  return (
    <div className="App">
      <header className="app-logo">
        <img 
          alt="catan logo"
          className="logo"
          src="https://logo.clearbit.com/catan.com"
        />
      </header>
      <Nav />
      <Switch>
        <Route path="/lobbies">
          <LobbyList 
              lobbies={lobbies}
              onFormSubmit={handleCreateGameFormSubmit}
              onJoinGame={handleJoinGame}
          />
        </Route>
        <Route path="/leaderboards">
          <Leaderboards />
        </Route>
        <Route exact path="/">
          <Home 
              onSignInSubmit={handleSignIn}
              onSignOut={handleSignOut}
              user={user}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
