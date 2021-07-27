import React, { useState } from "react"

const CreateAccount = ({ onCreateSubmit }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    points: 0
  })

  const handleUserChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setUserInfo({...userInfo, [key]: value})
  }

  const createAccountSubmit = (e) => {
    e.preventDefault()
    onCreateSubmit({...userInfo, points: parseInt(userInfo.points)})
    setUserInfo({
      name: "",
      password: "",
      points: 0
    })
  }

  const createAccount = (
    <form onSubmit={createAccountSubmit}>
      <input
        className="input"
        name="name"
        onChange={handleUserChange}
        placeholder="Username ..."
        type="text"
        value={userInfo.name}
      />
      <input
        className="input"
        name="password"
        onChange={handleUserChange}
        placeholder="Password ..."
        type="password"
        value={userInfo.password}
      />
      <input
        className="button"
        name="submit"
        type="submit" 
        value="Create Account"
      />
    </form>
  )

  return (
    <div className="main">
      <h1>Create an account!</h1>
      {createAccount}
    </div>
  )
}

export default CreateAccount