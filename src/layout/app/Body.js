/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarRegular, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import ListContainer from '../../components/ListContainer'
import ListItem from '../../components/ListItem'
import ButtonDropdown from '../../components/ButtonDropdown'
import EditorBody from '../../components/Editor/EditorBody'
import EditorHeader from '../../components/Editor/EditorHeader'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectNoteById, deleteNote, makeNoteFavorite, updateNote } from '../../redux/reducers/notesReducer'

const Body = () => {
  const dispath = useDispatch()
  const navigate = useNavigate()

  const { noteId } = useParams()
  const currentNote = useSelector((state) => selectNoteById(state, noteId))

  const [isEditable, setIsEditable] = useState(true)
  const [titleEdited, setTitleEdited] = useState({})
  const [bodyEdited, setBodyEdited] = useState({})
  // const [editedDate, setEditedDate] = useState({})

  // const toHumanDate = () => {
  //   if (currentNote) {
  //     const createdAtInUnix = currentNote.created_at
  //     const lastEditionInUnix = currentNote.last_edition

  //     const createdDate = new Date(createdAtInUnix)
  //     const lastEditionDate = new Date(lastEditionInUnix)

  //     const humanDateFormat = {
  //       created: createdDate.toLocaleString(),
  //       edited: lastEditionDate.toLocaleString()
  //     }

  //     return humanDateFormat.edited
  //   }
  // }

  useEffect(() => {
    console.log(titleEdited)
  }, [titleEdited])

  return (
    <div className='bg-[#191919] h-full grow'>
      {
        currentNote &&
        // eslint-disable-next-line react/jsx-indent
        <>
          <aside className='h-12 px-3 flex justify-between items-center text-[#d4d4d4] text-sm relative'>
            <span>{
              // eslint-disable-next-line no-prototype-builtins
              currentNote.note.header.content[0].content
                ? currentNote.note.header.content[0].content[0].text
                : 'Untitled'
            }</span>
            <div className='flex items-center gap-2'>
              <span>last edition: {currentNote.last_edition}</span>
              <button onClick={() => dispath(makeNoteFavorite(noteId))} className='flex items-center justify-center hover:text-yellow-500 transition-colors text-lg px-1'>
                {
                  currentNote.favorite
                    ? <FontAwesomeIcon icon={faStarSolid} className='text-yellow-500' />
                    : <FontAwesomeIcon icon={faStarRegular} />
                }
              </button>
              <ButtonDropdown extraStyles='bg-[#202020] top-full right-3' buttonChildren={<FontAwesomeIcon icon={faEllipsis} className='text-lg' />} buttonStyles='hover:bg-[#3b3b3b] transition-colors w-8 h-7 flex items-center justify-center rounded'>
                <ListContainer header='Note settings' width='w-60' extraStyles='z-20'>
                  <ListItem extraStyles='hover:bg-[#3b3b3b] transition-colors' action={() => setIsEditable(!isEditable)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <span>Edit</span>
                  </ListItem>
                  <ListItem
                    extraStyles='hover:bg-[#3b3b3b] transition-colors' action={() => {
                      dispath(deleteNote(noteId))
                      navigate('..')
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                    <span>Delete</span>
                  </ListItem>
                </ListContainer>
              </ButtonDropdown>
            </div>
          </aside>
          <main className='overflow-y-auto overflow-x-hidden h-[calc(100%-48px)] mx-auto'>
            <div className='max-w-[708px] mx-auto w-full h-full relative'>
              <OverlayScrollbarsComponent
                className='h-full w-full'
                options={{ scrollbars: { theme: 'os-theme-light' } }}
              >
                <EditorHeader isEditable={isEditable} currentNote={currentNote} titleEdited={setTitleEdited} />
                <EditorBody isEditable={isEditable} currentNote={currentNote} bodyEdited={setBodyEdited} />
                {
                  isEditable &&
                  <button
                    className='absolute bottom-8 right-0 py-1 px-2 mt-8 bg-green-500 text-white rounded' onClick={() => {
                      setIsEditable(false)
                      dispath(updateNote({ id: noteId, header: titleEdited, body: bodyEdited }))
                    }}
                  >
                    Save changes
                  </button>
                }
              </OverlayScrollbarsComponent>
            </div>
          </main>
        </>
      }
    </div>
  )
}

export default Body
