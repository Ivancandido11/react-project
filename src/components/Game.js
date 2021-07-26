import React from "react"

const Game = (props) => {
  const fullGame = () => {
    if (props.players.length < 4) {
      return <button>Join</button>
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