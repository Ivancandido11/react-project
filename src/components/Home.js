import React, { useState } from "react"
import { useHistory  } from "react-router-dom"
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

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword)
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
      <button onClick={handleCreateAccount}>Create Account</button>
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