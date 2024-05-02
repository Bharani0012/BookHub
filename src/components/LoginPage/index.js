import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
      sameSite: 'None',
      secure: true,
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true})
    }
  }

  render() {
    const {username, password, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-app-container">
        <div className="login-bg-image-container">{null}</div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dmethdigg/image/upload/v1713767576/Group_7731icon_hldbod.png"
              className="logo"
              alt="login website logo"
            />
            <div className="input-container">
              <label className="input-label" htmlFor="username">
                Username*
              </label>
              <input
                type="text"
                className="input-feild"
                placeholder="Username"
                id="username"
                value={username}
                onChange={event =>
                  this.setState({username: event.target.value})
                }
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="password">
                Password*
              </label>
              <input
                type="password"
                className="input-feild"
                placeholder="password"
                id="password"
                value={password}
                onChange={event =>
                  this.setState({password: event.target.value})
                }
              />
            </div>
            <div className="error-para">
              {showErrorMsg && <p>Username or Password is Invalid</p>}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
