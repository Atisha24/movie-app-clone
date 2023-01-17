import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import HomePosterOriginals from '../HomePosterOriginals'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import FailureView from '../FailureView'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    homePoster: {},
  }

  componentDidMount() {
    this.getHomePoster()
  }

  getHomePoster = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const dataLength = data.results.length
      const randomPoster = data.results[Math.floor(Math.random() * dataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        posterPath: randomPoster.poster_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
      }

      this.setState({
        homePoster: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getHomePoster()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color=" #D81F26"
      />
    </div>
  )

  renderSuccessView = () => {
    const {homePoster} = this.state

    return (
      <>
        <HomePosterOriginals poster={homePoster} />
      </>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderHomePoster = () => {
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
      <div className="home-container">
        <Header />
        <div className="home-poster-container">{this.renderHomePoster()}</div>
        <div>
          <div>
            <h1 className="heading">Trending Now</h1>
            <TrendingNow />
          </div>
          <div>
            <h1 className="heading">Originals</h1>
            <Originals />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
