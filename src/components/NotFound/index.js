import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <h1 className="not-found-heading">Lost your way?</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <Link to="/" className="nav-link">
        <button className="not-found-home-btn" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
