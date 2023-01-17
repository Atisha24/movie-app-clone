import './index.css'

const FailureView = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="failed-container">
      <img
        src="https://res.cloudinary.com/atisha/image/upload/v1668684122/Failure_image_vrzbcq.png"
        alt="failure view"
        className="failed-view-image"
      />
      <p className="failed-description">
        Something went wrong. Please try again
      </p>
      <button className="try-again-btn" type="button" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
