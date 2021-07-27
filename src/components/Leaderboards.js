import React from "react"
import "../App.css"

const Leaderboards = ({ users }) => {
  const rankings = users.sort((a, b) => b.points - a.points)
  return (
    <div className="main">
      <h1>Leaderboards</h1>
      <ol>
        {rankings.map(user => <li key={user.id}>{user.name} Points: {user.points}</li>)}
      </ol>
    </div>
  )
}

export default Leaderboards