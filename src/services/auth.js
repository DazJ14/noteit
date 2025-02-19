import axios from 'axios'
const baseUrl = 'https://noteit-api-service.onrender.com/api'

const authSession = async (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  try {
    const { data } = await axios.get(baseUrl + '/login', config)
    return data
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const login = async (credentials) => {
  try {
    const { data } = await axios.post(baseUrl + '/login', credentials)
    return data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const register = async (credentials) => {
  try {
    const { data } = await axios.post(baseUrl + '/users', credentials)
    return data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default { authSession, login, register }
