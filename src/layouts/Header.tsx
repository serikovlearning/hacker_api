import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'

const Header: React.FC = () => {
  return (
    <nav className={classes.header}>
      <Link to='/'>
        <div>Hacker News</div>
      </Link>
    </nav>
  )
}

export default Header