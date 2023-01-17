import './index.css'

const HomePosterOriginals = props => {
  const {poster} = props
  const {backdropPath, title, overview} = poster

  return (
    <>
      <div
        className="home-poster-container"
        alt={title}
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        <div className="home-poster-content">
          <h1 className="home-poster-title">{title}</h1>
          <p className="home-poster-overview">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    </>
  )
}

export default HomePosterOriginals
