import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {

  const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    if (history) {
      navigate('/login')
    } else {
      console.error('Unable to access history object')
    }
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <div>
        <Link className="home" to="/">
          Home
        </Link>
        <Link className="jobs" to="/jobs">
          Jobs
        </Link>
      </div>
      <div className="butn-container">
        <button className="butn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
