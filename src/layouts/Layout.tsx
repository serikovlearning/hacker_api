import React, { ReactNode } from 'react'
import Header from './Header'
import { BrowserRouter } from 'react-router-dom'
import BackgroundText from '../components/UI/BackgroundText'

interface ILayoutProps {
  children: ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <BackgroundText />
        <div>{children}</div>
      </BrowserRouter>
    </div>
  )
}

export default Layout