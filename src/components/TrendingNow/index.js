import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SlickMovieCard from '../SlickMovieCard'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingNow extends Component {
  state = {
    trendingNow: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingNowMovies()
  }

  getTrendingNowMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/trending-movies`
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
      }))
      this.setState({
        trendingNow: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getTrendingNowMovies()
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        type="TailSpin"
        testid="loader"
        color="#0b69ff"
        height="50"
        width="50"
      />
    </div>
  )

  renderSuccessView = () => {
    const {trendingNow} = this.state
    return (
      <>
        <SlickMovieCard movies={trendingNow} />
      </>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderTrendingNow = () => {
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
      <div className="trending-now-container">{this.renderTrendingNow()}</div>
    )
  }
}

export default TrendingNow
