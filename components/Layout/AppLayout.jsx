import React from 'react'
import MainContainer from './MainContainer'
import Sidebar from '../Layout/Sidebar'
import Application from '../Layout/Application'

const AppLayout = ({ children }) => {
  return (
    <MainContainer>
      <Sidebar></Sidebar>
      <Application>{children}</Application>
    </MainContainer>
  )
}

export default AppLayout
