import React from "react"
import "../App.css"

const Home = ({ onSignInSubmit, onSignOut, user }) => {

  const signInSubmit = (e) => {
    e.preventDefault()
    onSignInSubmit(e.target.username.value, e.target.password.value)
  }

  const signIn = (
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
        type="password"
      />
      <input
        className="button"
        name="submit"
        type="submit" 
        value="Sign In"
      />
    </form>
  )

  return (
    <div className="main">
      <h1>{user ? `Welcome, ${user}!` : "Welcome, please sign in!"}</h1>
      {user ? <button onClick={onSignOut} >Sign Out</button> : signIn }
    </div>
  )
}

export default Home