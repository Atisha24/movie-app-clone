import './index.css'

const MovieDetailCard = props => {
  const {movieDetails} = props
  const {
    backdropPath,
    title,
    runtime,
    adult,
    releaseDate,
    overview,
  } = movieDetails

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(releaseDate)
  const year = date.getFullYear()

  return (
    <>
      <div
        className="movie-details-card-container"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: `100% 100%`,
          height: '100%',
        }}
      >
        <div className="movie-card-content-container">
          <h1 className="movie-title">{title}</h1>
          <div className="runtime-container">
            <p className="movie-runtime">{`${hours}h ${minutes}m`}</p>
            <p className="movie-info-a-ua">{adult ? 'A' : 'U/A'}</p>
            <p className="movie-year">{year}</p>
          </div>
          <p className="movie-overview">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    </>
  )
}

export default MovieDetailCard
