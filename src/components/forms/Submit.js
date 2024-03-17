const Submit = ({ children, disabled = false }) => {
  return (
    <div>
      <button
        type='submit'
        disabled={disabled}
        className={`${disabled ? 'cursor-not-allowed bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-400'}  flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      >
        {children}
      </button>
    </div>
  )
}

export default Submit
