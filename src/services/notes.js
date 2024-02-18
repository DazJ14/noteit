import axios from 'axios'
const baseUrl = 'https://noteit-api-service.onrender.com/api/notes'

const getUserNotes = async (token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = await axios.get(baseUrl, config)
  return request.data
}

const createNote = async (token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.post(baseUrl, {}, config)
  return request.data
}

const updateNote = async (id, newObject, token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
  console.log(request)
  return request.data
}

const deleteNote = async (id, token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const makeNoteFavorite = async (noteId, isFavorite, token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = await axios.put(`${baseUrl}/favorite/${noteId}`, isFavorite, config)

  return request.data
}

export default { getUserNotes, createNote, updateNote, makeNoteFavorite, deleteNote }
