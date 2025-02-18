import { useDispatch } from 'react-redux'
import { createNewNote } from '../redux/reducers/notesReducer'
import { useNavigate } from 'react-router-dom'

const NoNoteSelected = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className='grow h-full flex flex-col items-center justify-center bg-[#191919] text-white'>
      <span className='text-white text-3xl font-semibold mb-4'>No note selected</span>
      <p className='text-lg mb-4'>You can try creating a new note or selecting an existing note</p>
      <button onClick={() => dispatch(createNewNote(navigate))} className='bg-[#3b3b3b] py-2 px-4 rounded hover:bg-[#4e4e4e] transition-colors'>Create new note</button>
    </div>
  )
}

export default NoNoteSelected
