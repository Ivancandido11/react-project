import React from "react"
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav"
import LobbyList from "./LobbyList";
import Leaderboards from "./Leaderboards";
import Home from "./Home";
import "../App.css"

function App() {
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
        <Route path="/joingame">
          <LobbyList />
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
