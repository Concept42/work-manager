import React from 'react'
import MainContainer from './MainContainer'
import Sidebar from '../Layout/Sidebar'
import Application from '../Layout/Application'
import { useSession } from 'next-auth/react'

const AppLayout = ({ children }) => {
  const { data: session } = useSession()
  return (
    <>
      {session ? (
        <MainContainer>
          <Sidebar></Sidebar>
          <Application>{children}</Application>
        </MainContainer>
      ) : (
        <Application>{children}</Application>
      )}
    </>
  )
}

export default AppLayout
