const Submit = ({ children, disabled = false }) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      className={`${disabled ? 'cursor-not-allowed bg-blue-300' : 'hover:bg-blue-600 bg-blue-500'}  transition-colors text-white text-sm w-full mt-2 block rounded px-4 py-2`}
    >
      {children}
    </button>
  )
}

export default Submit
