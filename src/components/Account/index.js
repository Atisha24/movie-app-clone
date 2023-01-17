import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import LoginContext from '../../context/LoginContext'

import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  // to convert into asterisk we can use the repeat function
  // syntax : string.repeat(count);

  const passwordInAsterisk = '*'.repeat(password.length)
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <LoginContext.Provider
      value={{
        username,
        password,
      }}
    >
      <div className="account-container">
        <Header />
        <div className="account-details-container">
          <h1 className="account-heading">Account</h1>
          <hr className="horizontal-line" />
          <div className="membership-container">
            <h1 className="membership-heading">Membership</h1>
            <div>
              <p className="email">{username}@gmail.com</p>
              <p className="password">Password: {passwordInAsterisk}</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="membership-plan-container">
            <p className="plan-details">Plan Details</p>
            <p className="premium">Premium</p>
            <p className="ultra-hd">Ultra HD</p>
          </div>
          <hr className="horizontal-line" />
          <div className="logout-container">
            <button className="logout" type="button" onClick={onClickLogout}>
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </LoginContext.Provider>
  )
}

export default Account
