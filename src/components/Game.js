import React from "react"

const Game = (props) => {
  const handleJoinClick = () => {
    props.onJoinGame(props.id, props.players)
  }

  const fullGame = () => {
    if (props.players.length < 4) {
      return <button onClick={handleJoinClick}>Join</button>
    } else {
      return <button>View</button>
    }
  }

  return (
    <tr>
      <td>{props.players.length}</td>
      <td>{props.title}</td>
      <td>{props.rank}</td>
      <td>{fullGame()}</td>
    </tr>
  )
}

export default Game