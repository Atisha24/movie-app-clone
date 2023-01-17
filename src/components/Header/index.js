import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearchBar: false,
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  render() {
    const {showMenu, showSearchBar} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassName
    let popularClassName
    let accountClassName

    switch (path) {
      case '/popular':
        homeClassName = 'inactive'
        popularClassName = 'active'
        accountClassName = 'inactive'
        break
      case '/account':
        homeClassName = 'inactive'
        popularClassName = 'inactive'
        accountClassName = 'active'
        break
      default:
        homeClassName = 'active'
        popularClassName = 'inactive'
        accountClassName = 'inactive'
        break
    }

    return (
      <nav className="nav-container">
        <div className="nav-elements-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/atisha/image/upload/v1668599228/MOVIES_LOGO_ga4cta.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="nav-list-items">
            <Link to="/" className="nav-link">
              <li className={`popup-heading ${homeClassName}`}>Home</li>
            </Link>
            <Link to="/popular" className="nav-link">
              <li className={`popup-heading ${popularClassName}`}>Popular</li>
            </Link>
          </ul>
          <div className="search-container">
            {showSearchBar && (
              <input
                type="search"
                onKeyDown={this.onChangeSearchInput}
                placeholder="search"
                className="search"
              />
            )}
            <Link to="/search" className="nav-link">
              <button
                type="button"
                className="search-button"
                testid="searchButton"
              >
                <HiOutlineSearch
                  size={20}
                  color="white"
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                />
              </button>
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/atisha/image/upload/v1669046347/female_avatar_nfrabm.png"
                alt="profile"
                className={`profile-logo ${accountClassName}`}
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="white"
              className="menu-icon"
              onClick={this.onClickShowMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div>
            <ul className="small-device-list">
              <Link to="/" className="nav-link">
                <li className={`popup-heading ${homeClassName}`}>Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`popup-heading ${popularClassName}`}>Popular</li>
              </Link>
              <Link to="/account" className="nav-link">
                <li className={`popup-heading ${accountClassName}`}>Account</li>
              </Link>
              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.onClickHideMenu}
                className="icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
