import {Component} from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMssg: '', submitErrorMssg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    return <Navigate to='/'/>
  }

  onSubmitFailure = error => {
    this.setState({submitErrorMssg: true, errorMssg: error})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }

    this.setState({password: '', username: ''})
  }

  getUserNameDetails = () => {
    const {username} = this.state
    return (
      <div className="userName-input">
        <label htmlFor="username" className="username">
          USERNAME
        </label>
        <br />
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  getPasswordDetails = () => {
    const {password} = this.state
    return (
      <div className="passwd-input">
        <label htmlFor="password" className="password">
          PASSWORD
        </label>
        <br />
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {submitErrorMssg, errorMssg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Navigate to="/" />
    }
    return (
      <div className="main-conatiner">
        <form className="cart-form" onSubmit={this.onSubmitForm}>
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>

          <div className="input-containers">
            <div>{this.getUserNameDetails()}</div>
            <div>{this.getPasswordDetails()}</div>
            <div className="butn-container">
              <button type="submit">Login</button>
            </div>
            <div>
              {submitErrorMssg && <p className="error-messg">{errorMssg}</p>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage
