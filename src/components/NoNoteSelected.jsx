import { useDispatch } from 'react-redux'
import { createNewNote } from '../redux/reducers/notesReducer'
import { useNavigate } from 'react-router-dom'

const NoNoteSelected = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className='flex h-full grow flex-col items-center justify-center bg-[#191919] text-white'>
      <span className='mb-4 text-3xl font-semibold text-white'>
        No note selected
      </span>
      <p className='mb-4 text-lg'>
        You can try creating a new note or selecting an existing note
      </p>
      <button
        onClick={() => dispatch(createNewNote(navigate))}
        className='rounded bg-[#3b3b3b] px-4 py-2 transition-colors hover:bg-[#4e4e4e]'
      >
        Create new note
      </button>
    </div>
  )
}

export default NoNoteSelected
