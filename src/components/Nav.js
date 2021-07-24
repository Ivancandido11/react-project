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
          to="/joingame"
          exact
          className="nav-menu"
          activeStyle={{background: "white"}}
      > Join Game
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