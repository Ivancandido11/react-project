import React from "react"
import { NavLink } from "react-router-dom"
import "../App.css"

const Nav = () => {
  return (
    <div className="nav">
      <NavLink 
          to="/"
          exact
          className="nav-menu"
          activeStyle={{background: "white"}}
      > Home
      </NavLink>
      <NavLink
          to="/lobbies"
          exact
          className="nav-menu"
          activeStyle={{background: "white"}}
      > Lobbies
      </NavLink>
      <NavLink
          to="/leaderboards"
          exact
          className="nav-menu"
          activeStyle={{background: "white"}}
      > Leaderboards
      </NavLink>
    </div>
  )
}

export default Nav