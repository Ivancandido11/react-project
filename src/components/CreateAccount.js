/* eslint-disable react/prop-types */
import React, { useState } from "react"

const CreateAccount = ({ onCreateSubmit, users }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    points: 0
  })

  const handleUserChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setUserInfo({ ...userInfo, [key]: value })
  }

  const createAccountSubmit = (e) => {
    e.preventDefault()
    if (userInfo.name.length > 0 && userInfo.password.length > 0 &&
      !(users.find(user => user.name.toLowerCase() === userInfo.name.toLowerCase()))) {
      onCreateSubmit({ ...userInfo, points: parseInt(userInfo.points) })
      setUserInfo({
        name: "",
        password: "",
        points: 0
      })
    } else if (users.find(user => user.name.toLowerCase() === userInfo.name.toLowerCase())) {
      const existingUser = users.find(user => user.name.toLowerCase() === userInfo.name.toLowerCase())
      alert(`The username ${existingUser.name} already exists!`)
    } else {
      alert("Please fill in username and password!")
    }
  }

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword)
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
        type={showPassword ? "text" : "password"}
        value={userInfo.password}
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
