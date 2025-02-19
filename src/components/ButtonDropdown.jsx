import { useRef, useEffect, useState } from 'react'

const ButtonDropdown = ({
  children,
  extraStyles,
  buttonStyles = '',
  buttonChildren = null,
}) => {
  const [show, setShow] = useState(false)
  const dropdown = useRef()
  const button = useRef()

  useEffect(() => {
    const handleOutsideClick = ({ target }) => {
      if (
        !dropdown.current.contains(target) &&
        !button.current.contains(target)
      ) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [show])

  return (
    <>
      <button
        ref={button}
        onClick={() => setShow(!show)}
        className={`${buttonStyles}`}
      >
        {buttonChildren || <span>Button</span>}
      </button>
      <div
        ref={dropdown}
        className={`${show ? 'visible scale-100 opacity-100' : 'invisible scale-90 opacity-0'} absolute z-50 rounded shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px] transition-all ${extraStyles}`}
      >
        {children}
      </div>
    </>
  )
}

export default ButtonDropdown
