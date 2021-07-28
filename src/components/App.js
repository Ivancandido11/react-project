import React, { useEffect, useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom";
import Nav from "./Nav"
import LobbyList from "./LobbyList";
import Leaderboards from "./Leaderboards";
import GamePage from "./GamePage";
import Home from "./Home";
import Adapter from "../Adapter";
import CreateAccount from "./CreateAccount";
import "../App.css"

function App() {
  const [lobbies, setLobbies] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [user, setUser] = useState("")
  const [sort, setSort] = useState("")
  const history = useHistory()

  useEffect(() => {
    Adapter.getLobbies()
      .then(data => setLobbies(data))
    Adapter.getUsers()
      .then(data => setAllUsers(data))
  }, [])

  const handleCreateGameFormSubmit = (newGame) => {
    Adapter.submit(newGame)
      .then(data => {
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
  
  const handleCreateAccountSubmit = (newAccount) => {
    Adapter.createAccount(newAccount)
      .then(data => {
        setAllUsers([...allUsers, data])
        setUser(data.name)
        history.push("/")
      })
  }

  const handleSignIn = (username, password) => {
    const currentUser = allUsers.filter(loggedInUser => loggedInUser.name.toLowerCase() === username.toLowerCase())
    if (currentUser.length > 0 && currentUser[0].password === password) {
      setUser(currentUser[0].name)
    } else if (currentUser.length > 0 && currentUser[0].password !== password){
      alert("Password is case-sensitive. Wrong password!")
    } else {
      alert("Please create an account!")
      history.push("/createaccount")
    }
  }
 
  const handleSortClick = (sort) => setSort(sort)

  const handleViewGameClick = (id) => history.push(`/gamepage/${id}`)

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

  const addPoints = (players) => {
    const currentUser = allUsers.filter(loggedInUser => loggedInUser.name === user)
    if (currentUser.length > 0) {
      const playerIn = players.filter(player => player === user)
      if (playerIn[0] === user) {
        Adapter.addPoints(currentUser[0].id, currentUser)
          .then(data => {
            const updatedUsers = allUsers.map(user => {
              if (data.id === user.id) return data
              else return user
            })
            setAllUsers(updatedUsers)
            alert("Game Finished! You got points!")
          })
      } else {
        alert("Game Finished!")
      }
    } else {
      alert("Please Sign In!")
      history.push("/")
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
          <Leaderboards users={allUsers}/>
        </Route>
        <Route path="/gamepage/:id">
          <GamePage
              onAddPoints={addPoints}
              onFinishGameClick={finishGame}
              onJoinGame={handleJoinGame}
              user={user}
          />
        </Route>
        <Route path="/createaccount">
          <CreateAccount onCreateSubmit={handleCreateAccountSubmit}/>
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
