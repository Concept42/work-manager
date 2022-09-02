export const Modal = ({ children }, props) => {
  return (
    <>
      <label htmlFor='my-modal-6' className='btn modal-button'>
        {props.buttonLabel}
      </label>
      <input type='checkbox' id='my-modal-6' className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          {children}
          <div className='modal-action'>
            <label htmlFor='my-modal-6' className='btn'>
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
