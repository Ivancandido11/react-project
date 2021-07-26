import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav"
import LobbyList from "./LobbyList";
import Leaderboards from "./Leaderboards";
import Home from "./Home";
import "../App.css"

function App() {
  const [lobbies, setLobbies] = useState([])
  const URL = "http://localhost:4000/lobbies"

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
          />
        </Route>
        <Route path="/leaderboards">
          <Leaderboards />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
