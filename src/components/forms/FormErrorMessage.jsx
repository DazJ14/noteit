const FormErrorMessage = ({ error }) => {
  return (
    <div className='text-red-500 mt-3 text-center'>
      <span>{error}</span>
    </div>
  )
}

export default FormErrorMessage
