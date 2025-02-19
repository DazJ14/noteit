/* eslint-disable react/jsx-closing-tag-location */
import ListContainer from '../../components/ListContainer'
import ListItem from '../../components/ListItem'
import NavigationListItem from '../../components/NavigationListItem'
import { useState, createContext } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNewNote,
  selectAllUserNotes,
  userLogOut as notesLogOut,
  selectFavoriteUserNotes,
} from '../../redux/reducers/notesReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faGear,
  faCirclePlus,
  faArrowRightFromBracket,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import ButtonDropdown from '../../components/ButtonDropdown'
import UserLabel from '../../components/UserLabel'
import { userLogOut } from '../../redux/reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

const navbarContext = createContext()

const Navbar = () => {
  const user = useSelector((state) => state.user?.username)
  const userNotes = useSelector((state) => selectAllUserNotes(state))
  const favoriteNotes = useSelector(selectFavoriteUserNotes)

  const [navbarExpanded, setNavbarExpanded] = useState(true)

  const navbarButtons = [
    {
      text: 'Search',
      icon: faMagnifyingGlass,
      action: () =>
        window.alert(
          'This option does nothing at the moment, but it will be implemented eventually'
        ),
    },
    {
      text: 'Settings',
      icon: faGear,
      action: () =>
        window.alert(
          'This option does nothing at the moment, but it will be implemented eventually'
        ),
    },
    {
      text: 'New note',
      icon: faCirclePlus,
      action: () => dispatch(createNewNote(navigate)),
    },
  ]

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteitAppUser')
    dispatch(userLogOut())
    dispatch(notesLogOut())
    navigate('/login')
  }

  return (
    <navbarContext.Provider value={navbarExpanded}>
      <nav
        className={clsx(
          'h-full border-r border-solid border-[#9B9B9B] bg-[#202020] p-1 transition-all',
          navbarExpanded ? 'w-[220px]' : 'w-[44px]'
        )}
      >
        <div className='flex h-full flex-col'>
          {' '}
          {/* put overflow-hidden here if necesary */}
          <div className='relative mb-2 flex h-10 items-center justify-start'>
            <ButtonDropdown
              extraStyles='top-[calc(100%+4px)] left-3 bg-[rgb(37,37,37)]'
              buttonChildren={<UserLabel />}
              buttonStyles={clsx(
                'hover:bg-[#3b3b3b] rounded transition-colors cursor-pointer w-full h-full flex items-center justify-start gap-2',
                navbarExpanded ? 'px-3' : 'px-1'
              )}
            >
              <ListContainer
                width='w-[320px]'
                header={`${user} profile`}
                headerColor='text-slate-100/90'
              >
                <ListItem
                  extraStyles='hover:bg-[#3b3b3b]'
                  action={() => handleLogout()}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  <span>Log out</span>
                </ListItem>
              </ListContainer>
            </ButtonDropdown>
            <button
              className={clsx(
                navbarExpanded ? 'right-1' : 'left-[calc(100%+12px)]',
                'absolute top-1/2 z-50 h-7 w-7 -translate-y-1/2 rounded text-white transition-colors hover:bg-[#555555]'
              )}
              onClick={() => setNavbarExpanded(!navbarExpanded)}
            >
              <FontAwesomeIcon
                icon={navbarExpanded ? faAnglesLeft : faAnglesRight}
              />
            </button>
          </div>
          <ListContainer
            padding={!navbarExpanded && 'p-0'}
            customStyles='grow-0'
          >
            {navbarButtons.map((button) => (
              <ListItem
                key={button.text}
                paddingX={navbarExpanded ? 'px-3' : 'px-1 py-0'}
                extraStyles='hover:bg-[#3b3b3b] transition-colors'
                action={button.action}
              >
                <div className='flex h-7 w-7 items-center justify-center'>
                  <FontAwesomeIcon icon={button.icon} />
                </div>
                <span
                  className={clsx(!navbarExpanded && 'hidden', 'line-clamp-1')}
                >
                  {button.text}
                </span>
              </ListItem>
            ))}
          </ListContainer>
          <hr className='my-2 w-full border-[#3b3b3b]' />
          <div className='overflow-y-auto'>
            <OverlayScrollbarsComponent
              className='h-full w-full'
              options={{ scrollbars: { theme: 'os-theme-light' } }}
            >
              {favoriteNotes.length > 0 ? (
                <ListContainer
                  header='Favorites'
                  headerColor='text-slate-100/90'
                >
                  {favoriteNotes.length !== 0
                    ? favoriteNotes.map(({ note, id }) => {
                        const header = note.header.content[0].content
                          ? note.header.content[0].content[0].text
                          : 'Untitled'

                        return (
                          <NavigationListItem
                            paddingX={navbarExpanded ? 'px-3' : 'px-1'}
                            extraStyles='hover:bg-[#3b3b3b] line-clamp-1'
                            key={id}
                            href={id}
                          >
                            <FontAwesomeIcon
                              icon={faFileLines}
                              className='text-base'
                            />
                            <span
                              className={clsx(
                                !navbarExpanded && 'hidden',
                                'line-clamp-1'
                              )}
                            >
                              {header}
                            </span>
                          </NavigationListItem>
                        )
                      })
                    : null}
                </ListContainer>
              ) : null}

              {userNotes ? (
                <ListContainer
                  header={navbarExpanded && 'Private'}
                  headerColor='text-slate-100/90'
                >
                  {userNotes.length !== 0 &&
                    userNotes.map(({ note, id }) => {
                      const header = note.header.content[0].content
                        ? note.header.content[0].content[0].text
                        : 'Untitled'
                      return (
                        <NavigationListItem
                          paddingX={navbarExpanded ? 'px-3' : 'px-1'}
                          extraStyles='hover:bg-[#3b3b3b]'
                          key={id}
                          href={id}
                        >
                          <div className='flex h-7 w-7 items-center justify-center'>
                            <FontAwesomeIcon
                              icon={faFileLines}
                              className='text-base'
                            />
                          </div>
                          <span
                            className={clsx(
                              !navbarExpanded && 'hidden',
                              'line-clamp-1'
                            )}
                          >
                            {header}
                          </span>
                        </NavigationListItem>
                      )
                    })}
                </ListContainer>
              ) : null}
            </OverlayScrollbarsComponent>
          </div>
        </div>
      </nav>
    </navbarContext.Provider>
  )
}

export default Navbar
