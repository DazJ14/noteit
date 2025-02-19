/* eslint-disable indent */
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import notes from '../../services/notes'

const initialState = {
  notes: [],
  status: 'idle',
  error: null,
}

export const fetchUserNotes = createAsyncThunk(
  'notes/fetchUserNotes',
  async (sessionToken) => {
    const token = sessionToken

    const fetchedUserNotes = await notes.getUserNotes(token)

    return fetchedUserNotes
  }
)

export const createNewNote = createAsyncThunk(
  'notes/createNewNote',
  async (navigate, { getState }) => {
    const token = getState().user.token
    const data = await notes.createNote(token)

    if (navigate) {
      navigate(`/notes/${data.id}`)
    }

    return data
  }
)

export const saveNote = createAsyncThunk(
  'notes/saveNote',
  (noteEdited, { getState }) => {
    const currentNotesState = getState().notes.notes
    const notesStateEdited = currentNotesState.map((noteData) =>
      noteData.id === noteEdited.id
        ? {
            ...noteData,
            last_edition: noteEdited.lastEdition,
            note: {
              header: noteEdited.header,
              body: noteEdited.body,
            },
          }
        : noteData
    )

    window.localStorage.setItem(
      'noteitAppNotes',
      JSON.stringify(notesStateEdited)
    )

    return noteEdited
  }
)

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (newNote, { getState }) => {
    const { id, header, body } = newNote
    console.log(
      'en el thunk updateNote antes de la peticion: ' + JSON.stringify(newNote)
    )
    const token = getState().user.token

    const request = await notes.updateNote(id, { header, body }, token)

    console.log('despues de la peticion: ' + JSON.stringify(request))

    return {
      id: request.id,
      note: request.note,
      lastEdition: request.last_edition,
    }
  }
)

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (noteId, { getState }) => {
    const token = getState().user.token

    await notes.deleteNote(noteId, token)
    return noteId
  }
)

export const makeNoteFavorite = createAsyncThunk(
  'notes/makeNoteFavorite',
  (noteId, { getState }) => {
    const currentNotesState = getState().notes.notes
    const notesStateEdited = currentNotesState.map((noteData) =>
      noteData.id === noteId
        ? {
            ...noteData,
            favorite: !noteData.favorite,
          }
        : noteData
    )

    window.localStorage.setItem(
      'noteitAppNotes',
      JSON.stringify(notesStateEdited)
    )

    return noteId
  }
)

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    userLogOut: (state) => {
      state.notes = []
      state.status = 'idle'
      state.error = null
    },
  },
  // eslint-disable-next-line space-before-function-paren
  extraReducers(builder) {
    builder
      .addCase(fetchUserNotes.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchUserNotes.fulfilled, (state, action) => {
        const { notes } = action.payload

        state.status = 'succed'
        state.notes = notes
      })
      .addCase(createNewNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        console.log('action.payload: ' + JSON.stringify(action.payload))
        const { id, note, lastEdition } = action.payload
        const existingNote = state.notes.find((note) => note.id === id)
        if (existingNote) {
          existingNote.note = note
          existingNote.last_edition = lastEdition
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const notesFiltered = state.notes.filter(
          (note) => note.id !== action.payload
        )
        state.notes = notesFiltered
      })
      .addCase(makeNoteFavorite.fulfilled, (state, action) => {
        const existingNote = state.notes.find(
          (note) => note.id === action.payload
        )
        existingNote.favorite = !existingNote.favorite
      })
  },
})

export const { userLogOut } = notesSlice.actions

export const selectAllUserNotes = (state) => state.notes.notes

export const selectNoteById = (state, noteId) =>
  state.notes.notes.find((note) => note.id === noteId)

export const selectFavoriteUserNotes = createSelector(
  [selectAllUserNotes],
  (notes) => notes.filter((note) => note.favorite)
)

export const selectFavoriteNotes = (state) => {
  const notesCopy = [...state.notes.notes]
  return notesCopy.filter((note) => note.favorite)
}

export default notesSlice.reducer
