import React, { useEffect, useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom";
import Nav from "./Nav"
import LobbyList from "./LobbyList";
import Leaderboards from "./Leaderboards";
import GamePage from "./GamePage";
import Home from "./Home";
import Adapter from "../Adapter";
import "../App.css"

function App() {
  const [lobbies, setLobbies] = useState([])
  const [user, setUser] = useState("")
  const [sort, setSort] = useState("")
  const history = useHistory()

  useEffect(() => {
    Adapter.getLobbies()
      .then(data => setLobbies(data))
  }, [])

  const handleCreateGameFormSubmit = (newGame) => {
    Adapter.submit(newGame)
      .then(data => {
        console.log(data)
        setLobbies([...lobbies, data])
        history.push(`/gamepage/${data.id}`)
      })
  }

  const handleJoinGame = (id, players) => {
    if(user !== "") {
      Adapter.joinGame(user, id, players)
        .then(data => {
          const updatedLobbies = lobbies.map(lobby => {
            if(lobby.id === data.id) return data
            else return lobby
          })
          setLobbies(updatedLobbies)
          history.push(`/gamepage/${data.id}`)
        })
    } else {
      alert("Please sign in!")
      history.push("/")
    }
  }

  const finishGame = (id) => {
    Adapter.delete(id)
      .then(() => {
        const updatedLobbies = lobbies.filter(lobby => lobby.id !== parseInt(id))
        setLobbies(updatedLobbies)
        history.push("/lobbies")
      })
  }
  
  const handleSortClick = (sort) => setSort(sort)

  const handleViewGameClick = (id) => history.push(`/gamepage/${id}`)

  const handleSignIn = (username) => setUser(username)
  
  const handleSignOut = () => setUser("")
  
  const lobbiesToDisplay = () => {
    if (sort === "title") {
      return lobbies.sort((a, b) => a[sort].localeCompare(b[sort]))
    } else if (sort === "") { return lobbies
    } else if (sort === "rank") { return lobbies.sort((a, b) => a[sort] - b[sort])
    } else {
      return lobbies.sort((a, b) => a[sort].filter(player => player !== "").length - b[sort].filter(player => player !== "").length)
    }
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
              lobbies={lobbiesToDisplay()}
              onFormSubmit={handleCreateGameFormSubmit}
              onJoinGame={handleJoinGame}
              onSortClick={handleSortClick}
              onViewGameClick={handleViewGameClick}
          />
        </Route>
        <Route path="/leaderboards">
          <Leaderboards />
        </Route>
        <Route path="/gamepage/:id">
          <GamePage
              onFinishGameClick={finishGame}
          />
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
