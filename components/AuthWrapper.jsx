import React from 'react'
import { useSession } from 'next-auth/react'
import ProtectedRoutes from './ProtectedRoutes'
import { useRouter } from 'next/router'

const authRoutes = ['/workorders']

const AuthWrapper = ({ children }) => {
  const { status } = useSession
  const router = useRouter()

  if (status === 'loading') return null
  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoutes>{children}</ProtectedRoutes>
      ) : (
        children
      )}
    </>
  )
}

export default AuthWrapper
