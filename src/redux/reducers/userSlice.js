import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import auth from '../../services/auth'
import { fetchUserNotes } from './notesReducer'

const initialState = {
  id: '',
  username: '',
  token: '',
  access: false
}

export const initializeAuth = createAsyncThunk('user/initializeAuth', async (_, { dispatch }) => {
  const localData = window.localStorage.getItem('loggedNoteitAppUser')
  const token = `Bearer ${localData}`

  const response = await auth.authSession(token)
  await dispatch(fetchUserNotes(token))

  return { ...response, token }
})

export const createNewUser = createAsyncThunk('user/createNewUser', async (data) => {
  const user = await auth.register({ username: data.username, password: data.password })

  window.localStorage.setItem('loggedNoteitAppUser', (user.token))

  return user
})

export const loginUser = createAsyncThunk('user/authUser', async (data, { dispatch }) => {
  // console.log('login thunk')
  const user = await auth.login({ username: data.username, password: data.password })
  const token = `Bearer ${user.token}`

  window.localStorage.setItem('loggedNoteitAppUser', (user.token))
  await dispatch(fetchUserNotes(token))

  return user
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogOut: (state) => {
      state.id = ''
      state.username = ''
      state.token = ''
      state.access = false
    }
  },

  // eslint-disable-next-line space-before-function-paren
  extraReducers(builder) {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        const { id, username, token } = action.payload

        state.id = id
        state.username = username
        state.token = token
        state.access = true
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        const { id, username, token } = action.payload

        state.id = id
        state.username = username
        state.token = `Bearer ${token}`
        state.access = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { id, username, token } = action.payload

        state.id = id
        state.username = username
        state.token = `Bearer ${token}`
        state.access = true
      })
  }
})

export const { userLogin, userLogOut } = userSlice.actions

export default userSlice.reducer
