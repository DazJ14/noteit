/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as faStarRegular,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons'
import {
  faStar as faStarSolid,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons'
import ListContainer from '../../components/ListContainer'
import ListItem from '../../components/ListItem'
import ButtonDropdown from '../../components/ButtonDropdown'
import EditorBody from '../../components/Editor/EditorBody'
import EditorHeader from '../../components/Editor/EditorHeader'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectNoteById,
  deleteNote,
  makeNoteFavorite,
  updateNote,
} from '../../redux/reducers/notesReducer'

const Body = () => {
  const dispath = useDispatch()
  const navigate = useNavigate()

  const { noteId } = useParams()
  const currentNote = useSelector((state) => selectNoteById(state, noteId))

  const [isEditable, setIsEditable] = useState(true)
  const [titleEdited, setTitleEdited] = useState({})
  const [bodyEdited, setBodyEdited] = useState({})

  useEffect(() => {
    setIsEditable(true)
  }, [noteId])

  // console.log('titulo', titleEdited)
  // console.log('body', bodyEdited)

  return (
    <div className='h-full grow bg-[#191919]'>
      {currentNote && (
        // eslint-disable-next-line react/jsx-indent
        <>
          <aside className='relative flex h-12 items-center justify-between px-3 text-sm text-[#d4d4d4]'>
            <span>
              {
                // eslint-disable-next-line no-prototype-builtins
                currentNote.note.header.content[0].content
                  ? currentNote.note.header.content[0].content[0].text
                  : 'Untitled'
              }
            </span>
            <div className='flex items-center gap-2'>
              <span>last edition: {currentNote.last_edition}</span>
              <button
                onClick={() => dispath(makeNoteFavorite(noteId))}
                className='flex items-center justify-center px-1 text-lg transition-colors hover:text-yellow-500'
              >
                {currentNote.favorite ? (
                  <FontAwesomeIcon
                    icon={faStarSolid}
                    className='text-yellow-500'
                  />
                ) : (
                  <FontAwesomeIcon icon={faStarRegular} />
                )}
              </button>
              <ButtonDropdown
                extraStyles='bg-[#202020] top-full right-3'
                buttonChildren={
                  <FontAwesomeIcon icon={faEllipsis} className='text-lg' />
                }
                buttonStyles='hover:bg-[#3b3b3b] transition-colors w-8 h-7 flex items-center justify-center rounded'
              >
                <ListContainer
                  header='Note settings'
                  width='w-60'
                  extraStyles='z-20'
                >
                  <ListItem
                    extraStyles='hover:bg-[#3b3b3b] transition-colors'
                    action={() => setIsEditable(!isEditable)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <span>Edit</span>
                  </ListItem>
                  <ListItem
                    extraStyles='hover:bg-[#3b3b3b] transition-colors'
                    action={() => {
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
          <main className='mx-auto h-[calc(100%-48px)] overflow-y-auto overflow-x-hidden'>
            <div className='relative mx-auto h-full w-full max-w-[708px]'>
              <OverlayScrollbarsComponent
                className='h-full w-full'
                options={{ scrollbars: { theme: 'os-theme-light' } }}
              >
                <EditorHeader
                  isEditable={isEditable}
                  currentNote={currentNote}
                  titleEdited={setTitleEdited}
                />
                <EditorBody
                  isEditable={isEditable}
                  currentNote={currentNote}
                  bodyEdited={setBodyEdited}
                />
                {isEditable && (
                  <button
                    className='absolute bottom-8 right-0 mt-8 rounded bg-green-500 px-2 py-1 text-white'
                    onClick={() => {
                      setIsEditable(false)
                      console.log(
                        'en el body: ' +
                          JSON.stringify({
                            id: noteId,
                            header: titleEdited,
                            body: bodyEdited,
                          })
                      )
                      dispath(
                        updateNote({
                          id: noteId,
                          header: titleEdited,
                          body: bodyEdited,
                        })
                      )
                    }}
                  >
                    Save changes
                  </button>
                )}
              </OverlayScrollbarsComponent>
            </div>
          </main>
        </>
      )}
    </div>
  )
}

export default Body
