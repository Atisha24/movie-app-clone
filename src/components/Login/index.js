import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import LoginContext from '../../context/LoginContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    // const {username, password} = this.state
    //  localStorage.setItem('username', username)
    //  localStorage.setItem('password', password)
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
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
  }

  renderUsernameField = () => (
    <LoginContext.Consumer>
      {value => {
        const {username} = value
        return (
          <>
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={this.onChangeUsername}
            />
          </>
        )
      }}
    </LoginContext.Consumer>
  )

  renderPasswordField = () => (
    <LoginContext.Consumer>
      {value => {
        const {password} = value
        return (
          <>
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="input-field"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
          </>
        )
      }}
    </LoginContext.Consumer>
  )

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/atisha/image/upload/v1668599228/MOVIES_LOGO_ga4cta.png"
          alt="login website logo"
          className="login-website-logo"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="login-text">Login</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          {showSubmitError && <p className="login-error-msg">*{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
