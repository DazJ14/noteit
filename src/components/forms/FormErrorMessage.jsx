const FormErrorMessage = ({ error }) => {
  return (
    <div className='mt-3 text-center text-red-500'>
      <span>{error}</span>
    </div>
  )
}

export default FormErrorMessage
