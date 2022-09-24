import React, { useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc'
import { useAppSelector } from '../../utils/hooks'

interface Props {
  errorMessage?: string
  successMessage?: string
}

function Toast({ errorMessage, successMessage }: Props) {
  const [error, setError] = useState<string | undefined>('')
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const globalError = useAppSelector((state) => state.userContext.error)

  useEffect(() => {
    setError(globalError)
    if (error) {
      setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }
  }, [globalError, error])

  return (
    <>
      {isVisible ? (
        <div className='toast toast-center z-40'>
          {error ? (
            <div className='alert alert-error'>
              <div>
                <span>{error}</span>
              </div>
            </div>
          ) : (
            ''
          )}
          {successMessage ? (
            <div className='alert alert-success'>
              <div>
                <span>{successMessage}</span>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default Toast
