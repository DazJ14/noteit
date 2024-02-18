/* eslint-disable react/jsx-closing-tag-location */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

const Input = ({ inputId = '', value = '', placeholder = '', type = 'text', labelText = '', setValue = null, passwordWithShowButton = false }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <>
      {
        (type === 'password' && passwordWithShowButton)
          ? <div className='my-3 first-of-type:mt-0'>
            <label htmlFor='password' className='text-base sm:text-sm mb-2 block'>Password</label>
            <div className='relative'>
              <input
                id='password'
                className='block focus:outline-2 focus:outline focus:outline-offset-1 focus:outline-blue-300 pl-4 pr-12 py-2 rounded bg-gray-100 text-base sm:text-sm w-full'
                type={passwordVisible ? 'text' : 'password'}
                value={value}
                required
                placeholder={placeholder}
                onChange={
                  ({ target }) => setValue(target.value)
                }
              />
              <button
                onClick={
                  () => setPasswordVisible(!passwordVisible)
                }
                type='button'
                className='absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5'
              >
                <FontAwesomeIcon icon={faEye} className='w-full h-full' />
              </button>
            </div>
          </div>
          : <div className='my-3 first-of-type:mt-0'>
            <label htmlFor={inputId} className='text-base sm:text-sm mb-2 block'>{labelText}</label>
            <input
              id={inputId}
              className='block focus:outline-2 focus:outline focus:outline-offset-1 focus:outline-blue-300 px-4 py-2 rounded bg-gray-100 text-base sm:text-sm w-full'
              type={type}
              value={value}
              required
              placeholder={placeholder}
              onChange={({ target }) => setValue(target.value)}
            />
          </div>
      }

    </>
  )
}

export default Input
