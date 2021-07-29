/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "../App.css"

const Home = ({ onSignInSubmit, onSignOut, user }) => {
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()

  const signInSubmit = (e) => {
    e.preventDefault()
    onSignInSubmit(e.target.username.value, e.target.password.value)
  }

  const handleCreateAccount = () => {
    history.push("/createaccount")
  }

  const handleLobbiesClick = () => {
    history.push("/lobbies")
  }

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword)
  }

  const notSignedIn = (
    <form onSubmit={signInSubmit}>
      <input
        className="input"
        name="username"
        placeholder="Username ..."
        type="text"
      />
      <input
        className="input"
        name="password"
        placeholder="Password ..."
        type={showPassword ? "text" : "password"}
      />
      <input
        checked={showPassword}
        onChange={handleShowPassword}
        type="checkbox"
      />Show
      <input
        className="button"
        name="submit"
        type="submit"
        value="Sign In"
      />
      <br />
      <h3>Dont have an account?</h3>
      <button onClick={handleCreateAccount}>Create Account</button>
    </form>
  )

  const signedIn = (
    <div>
      <h2>Welcome {user.name}!</h2>
      {user.points > 0
        ? `You currently have earned ${user.points} points!`
        : "You currently have no points."}
      <br />
      <button onClick={handleLobbiesClick}>Lobbies</button>
    </div>
  )

  return (
    <div className="main">
      <h1>{user ? signedIn : "Welcome, please sign in!"}</h1>
      {user ? <button onClick={onSignOut} >Sign Out</button> : notSignedIn }
    </div>
  )
}

export default Home
