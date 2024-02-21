/* eslint-disable react/jsx-closing-tag-location */
import ListContainer from '../../components/ListContainer'
import ListItem from '../../components/ListItem'
import NavigationListItem from '../../components/NavigationListItem'
import { useEffect, useState } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewNote, selectAllUserNotes, userLogOut as notesLogOut } from '../../redux/reducers/notesReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faGear, faCirclePlus, faArrowRightFromBracket, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import ButtonDropdown from '../../components/ButtonDropdown'
import UserLabel from '../../components/UserLabel'
import { userLogOut } from '../../redux/reducers/userSlice'
import { useNavigate } from 'react-router-dom'

const svgIcons = {
  search: faMagnifyingGlass,
  settings: faGear,
  newnote: faCirclePlus
}

const Navbar = () => {
  const user = useSelector((state) => state.user?.username)
  const userNotes = useSelector((state) => selectAllUserNotes(state))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [favoriteNotes, setFavoriteNotes] = useState([])

  useEffect(() => {
    let newFavoriteNotes = []

    for (let note = 0; note < userNotes.length; note++) {
      if (userNotes[note].favorite) {
        const favoriteNote = userNotes.slice(note, note + 1)
        newFavoriteNotes = newFavoriteNotes.concat(favoriteNote)
      }
    }
    setFavoriteNotes(newFavoriteNotes)
  }, [userNotes])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteitAppUser')
    dispatch(userLogOut())
    dispatch(notesLogOut())
    navigate('/login')
  }

  return (
    <nav className='h-full w-[220px] p-1 bg-[#202020] relative border-r border-solid border-[#9B9B9B]'>
      <div className='h-full flex flex-col'> {/* put overflow-hidden here if necesary */}
        <div className='relative h-10 mb-2 flex items-center justify-start'>
          <ButtonDropdown extraStyles='top-[calc(100%+4px)] left-3 bg-[rgb(37,37,37)]' buttonChildren={<UserLabel />} buttonStyles='hover:bg-[#3b3b3b] rounded transition-colors cursor-pointer w-full h-full px-3 flex items-center justify-start gap-2'>
            <ListContainer width='w-[320px]' header={`${user} profile`} headerColor='text-slate-100/90'>
              <ListItem extraStyles='hover:bg-[#3b3b3b]' action={() => handleLogout()}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /><span>Log out</span>
              </ListItem>
            </ListContainer>
          </ButtonDropdown>
          <button className='absolute top-1/2 -translate-y-1/2 right-1 hover:bg-[#555555] transition-colors w-7 h-7 rounded text-white' onClick={() => window.alert('This option does nothing at the moment, but it will be implemented eventually')}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
        </div>

        <ListContainer customStyles='grow-0'>
          <ListItem extraStyles='hover:bg-[#3b3b3b] transition-colors' action={() => window.alert('This option does nothing at the moment, but it will be implemented eventually')}>
            <FontAwesomeIcon icon={svgIcons.search} />
            <span>Search</span>
          </ListItem>
          <ListItem extraStyles='hover:bg-[#3b3b3b] transition-colors' action={() => window.alert('This option does nothing at the moment, but it will be implemented eventually')}>
            <FontAwesomeIcon icon={svgIcons.settings} />
            <span>Settings</span>
          </ListItem>
          <ListItem extraStyles='hover:bg-[#3b3b3b] transition-colors' action={() => dispatch(createNewNote())}>
            <FontAwesomeIcon icon={svgIcons.newnote} />
            <span>New note</span>
          </ListItem>
        </ListContainer>

        <div className='grow overflow-y-auto'>
          <OverlayScrollbarsComponent
            className='h-full w-full'
            options={{ scrollbars: { theme: 'os-theme-light' } }}
          >
            {
              favoriteNotes.length > 0
                ? <ListContainer header='Favorites' headerColor='text-slate-100/90'>
                  {favoriteNotes.length !== 0
                    ? favoriteNotes.map(({ note, id }) => {
                      const header = note.header.content[0].content
                        ? note.header.content[0].content[0].text
                        : 'Untitled'

                      return (
                        <NavigationListItem textColor='text-[#9B9B9B]' extraStyles='hover:bg-[#3b3b3b] line-clamp-1' key={id} href={id}>
                          <FontAwesomeIcon icon={faFileLines} className='text-base' />
                          <span>{header}</span>
                        </NavigationListItem>
                      )
                    })
                    : null}
                </ListContainer>
                : null
            }

            {
              userNotes
                ? <ListContainer header='Private' headerColor='text-slate-100/90'>
                  {userNotes.length !== 0 &&
                    userNotes.map(({ note, id }) => {
                      const header = note.header.content[0].content
                        ? note.header.content[0].content[0].text
                        : 'Untitled'
                      return (
                        <NavigationListItem textColor='text-[#9B9B9B]' extraStyles='hover:bg-[#3b3b3b]' key={id} href={id}>
                          <FontAwesomeIcon icon={faFileLines} className='text-base' />
                          <span className='line-clamp-1'>{header}</span>
                        </NavigationListItem>
                      )
                    })}
                </ListContainer>
                : null
            }
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
