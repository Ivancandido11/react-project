import React, { useState } from "react"

const CreateGameForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    players: [],
    title: "",
    rank: ""
  })

  const handleFormChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setFormData({...formData, [key]:value})
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onFormSubmit({...formData, rank: parseInt(formData.rank)})
    setFormData({
      players: [],
      title: "",
      rank: ""
    })
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit} >
        <h3>Create a New Lobby!</h3>
        <input
          name="title"
          onChange={handleFormChange}
          placeholder="Enter lobby name ..."
          type="text"
          value={formData.title}
        />
        <input
          name="rank"
          onChange={handleFormChange}
          placeholder="Minimum rank"
          type="number"
          value={formData.rank}
        />
        <input
          name="submit"
          type="submit"
          value="Create New Lobby"
        />
      </form>
    </div>
  )
}

export default CreateGameForm