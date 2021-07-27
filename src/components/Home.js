import React from "react"
import "../App.css"

const Home = ({ onSignInSubmit, onSignOut, user }) => {
  const signInSubmit = (e) => {
    e.preventDefault()
    onSignInSubmit(e.target.signIn.value)
  }

  const signIn = (
    <form onSubmit={signInSubmit}>
      <input
        className="input"
        name="signIn"
        placeholder="Username ..."
        type="text"
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