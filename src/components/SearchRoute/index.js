import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    searchMovies: [],
  }

  componentDidMount() {
    this.getSearchedMovies()
  }

  getSearchedMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
        backdropPath: each.backdrop_path,
      }))
      this.setState({
        searchMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchInput = text => {
    this.setState(
      {
        searchInput: text,
      },
      this.getSearchedMovies,
    )
  }

  onRetry = () => {
    this.getSearchedMovies()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderNotFoundMovies = () => {
    const {searchInput} = this.state

    return (
      <div className="search-no-found-container">
        <img
          src="https://res.cloudinary.com/atisha/image/upload/v1669036359/Search_result_no_found_image_oqsxjn.png"
          alt="no movies"
          className="search-not-found-image"
        />
        <h1 className="search-not-found-heading">
          Your search for {searchInput} did not find any matches.
        </h1>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchMovies} = this.state

    return (
      <>
        {searchMovies.length > 0 ? (
          <>
            <div className="search-results-container">
              <div className="search-results-movie-container">
                <ul className="search-movie-list-container">
                  {searchMovies.map(each => (
                    <Link to={`/movies/${each.id}`} key={each.id}>
                      <li className="search-movie-item" key={each.id}>
                        <img
                          src={each.posterPath}
                          alt={each.title}
                          className="search-poster"
                        />
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          this.renderNotFoundMovies()
        )}
      </>
    )
  }

  renderSearchMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-route-container">
        <Header searchInput={this.searchInput} />
        <div>{this.renderSearchMovies()}</div>
        <Footer />
      </div>
    )
  }
}

export default SearchRoute
