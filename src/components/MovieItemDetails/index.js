import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import MovieDetailCard from '../MovieDetailCard'
import FailureView from '../FailureView'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: [],
    genres: [],
    audioAvailable: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = [data.movie_details].map(each => ({
        id: each.id,
        backdropPath: id.backdrop_path,
        budget: each.budget,
        title: each.title,
        overview: each.overview,
        posterPath: each.poster_path,
        originalLanguage: each.original_Language,
        releaseDate: each.release_date,
        count: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
      }))

      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))

      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )

      const updatedSpokenLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )

      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        audioAvailable: updatedSpokenLanguagesData,
        similarMovies: updatedSimilarData.slice(0, 6),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, genres, audioAvailable, similarMovies} = this.state
    const newMovieDetails = {...movieDetails[0]}
    const {releaseDate, count, rating, budget} = newMovieDetails

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const d = new Date(releaseDate)
    const monthName = months[d.getMonth()]
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const day = date.getDay().toString()
    let dateEndingWord
    if (day.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }

    return (
      <>
        <div className="movie-details-container">
          {/* Displaying MOVIE  DETAILS */}
          <div className="movie-detail-card">
            {movieDetails.map(each => (
              <MovieDetailCard movieDetails={each} key={each.id} />
            ))}
          </div>
        </div>

        <div className="movie-detail-additional-info-container">
          {/* Displaying genre */}
          <ul className="genre-list-container">
            <h1 className="heading">Genres</h1>
            {genres.map(eachGenre => (
              <li className="genre-list-item" key={eachGenre.id}>
                {eachGenre.name}
              </li>
            ))}
          </ul>
          {/* Displaying Audio */}
          <ul className="genre-list-container">
            <h1 className="heading">Audio Available</h1>
            {audioAvailable.map(eachAudio => (
              <li className="genre-list-item" key={eachAudio.id}>
                {eachAudio.language}
              </li>
            ))}
          </ul>
          <div className="rating-count-average-container">
            <h1 className="heading">Rating Count</h1>
            <p className="movie-info">{count}</p>
            <h1 className="heading">Rating Average</h1>
            <p className="movie-info">{rating}</p>
          </div>
          <div className="budget-release-date-container">
            <h1 className="heading">Budget</h1>
            <p className="movie-info">{budget}</p>
            <h1 className="heading">Release Date</h1>
            <p>
              <span className="movie-info">{day}</span>
              <span className="movie-info date-end">{dateEndingWord}</span>
              <span className="movie-info month-name">{monthName}</span>
              <span className=" movie-info">{year}</span>
            </p>
          </div>
        </div>
        {/* Displaying SIMILAR MOVIES */}
        <div className="similar-movie-container">
          <h1 className="more-like-this">More like this</h1>
          <ul className="similar-movie-list-container">
            {similarMovies.map(each => (
              <Link to={`/movies/${each.id}`} key={each.id} target="blank">
                <li className="similar-movie-list-item" key={each.id}>
                  <img
                    src={each.posterPath}
                    className="poster-path"
                    alt={each.title}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderMovieDetailsView = () => {
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
      <div className="movie-items-details-container">
        <Header />
        <div className="root-container">
          <div
            className="video-details-view-container"
            data-testid="videoItemDetails"
          >
            {this.renderMovieDetailsView()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
