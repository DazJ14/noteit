/* eslint-disable react/jsx-closing-tag-location */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

const Input = ({
  inputId = '',
  value = '',
  placeholder = '',
  type = 'text',
  labelText = '',
  setValue = null,
  passwordWithShowButton = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <>
      {type === 'password' && passwordWithShowButton ? (
        <div className='my-3 first-of-type:mt-0'>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-white'
          >
            Password
          </label>
          <div className='relative mt-2'>
            <input
              id='password'
              className='block w-full rounded-md border-0 bg-white/5 py-1.5 pl-3 pr-12 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              type={passwordVisible ? 'text' : 'password'}
              value={value}
              required
              placeholder={placeholder}
              onChange={({ target }) => setValue(target.value)}
            />
            <button
              onClick={() => setPasswordVisible(!passwordVisible)}
              type='button'
              className='absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white'
            >
              <FontAwesomeIcon icon={faEye} className='h-full w-full' />
            </button>
          </div>
        </div>
      ) : (
        <div className='my-3 first-of-type:mt-0'>
          <label
            htmlFor={inputId}
            className='block text-sm font-medium leading-6 text-white'
          >
            {labelText}
          </label>
          <div className='mt-2'>
            <input
              id={inputId}
              className='block w-full rounded-md border-0 bg-white/5 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
              type={type}
              value={value}
              required
              placeholder={placeholder}
              onChange={({ target }) => setValue(target.value)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Input
