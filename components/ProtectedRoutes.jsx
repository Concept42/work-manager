import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const ProtectedRoutes = ({ children }) => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [router, status])

  if (status === 'unauthenticated') return null
  return <>{children}</>
}

export default ProtectedRoutes
