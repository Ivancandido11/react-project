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
        name="signIn"
        placeholder="Username ..."
        type="text"
      />
      <input
        name="submit"
        type="submit" 
        value="Sign In"
      />
    </form>
  )

  return (
    <div className="main">
      <h1>{user ? `Welcome, ${user}!` : "Welcome, Please Sign In!"}</h1>
      {user ? <button onClick={onSignOut} >Sign Out</button> : signIn }
    </div>
  )
}

export default Home