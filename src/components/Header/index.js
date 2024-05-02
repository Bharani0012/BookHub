import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {IoMdCloseCircle} from 'react-icons/io'
import {FaMoon, FaSun} from 'react-icons/fa'
import {useTheme} from '../../ThemeContextProvider/ThemeContext'
import './index.css'

const Header = props => {
  const {location} = props
  const {pathname} = location
  const [showMobileNav, setMobileNavStatus] = useState(false)
  const {isDarkTheme, toggleTheme} = useTheme()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav
      className={`navbar-container ${
        isDarkTheme ? 'dark-header' : 'light-header'
      }`}
    >
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dmethdigg/image/upload/v1713767576/Group_7731icon_hldbod.png"
            className="logo"
            alt="website logo"
          />
        </Link>
        <div className="theme-button-container">
          {isDarkTheme ? (
            <button
              className="light-theme-button"
              onClick={toggleTheme}
              type="button"
            >
              <FaSun />
            </button>
          ) : (
            <button
              className="dark-theme-button"
              onClick={toggleTheme}
              type="button"
            >
              <FaMoon />
            </button>
          )}
        </div>
        <ul className="nav-list-desktop">
          <Link to="/" className="link-item">
            <li className={pathname === '/' ? 'active' : ''}>Home</li>
          </Link>
          <Link to="/shelf" className="link-item">
            <li className={pathname === '/shelf' ? 'active' : ''}>
              Bookshelves
            </li>
          </Link>
          <li>
            <button
              className="logout-button"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <button
          className="hamburger-icon"
          onClick={() => setMobileNavStatus(!showMobileNav)}
          type="button"
        >
          <img
            src="https://res.cloudinary.com/dmethdigg/image/upload/v1713807838/iconicon_fv5ret.png"
            alt=""
          />
        </button>
      </div>
      {showMobileNav && (
        <div className="list-mobile-nav-container">
          <ul className="nav-list-mobile">
            <button
              className="close-button"
              type="button"
              onClick={() => setMobileNavStatus(false)}
            >
              <IoMdCloseCircle />
            </button>
            <Link to="/" className="link-item">
              <li className={pathname === '/' ? 'active' : ''}>Home</li>
            </Link>
            <Link to="/shelf" className="link-item">
              <li className={pathname === '/shelf' ? 'active' : ''}>
                Bookshelves
              </li>
            </Link>
            <li>
              <button
                className="logout-button"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default withRouter(Header)
