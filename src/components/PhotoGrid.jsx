import { useState } from 'react'

const baseUrl = import.meta.env.BASE_URL

const photoFiles = [
  'foto-1.JPEG',
  'foto-2.JPEG',
  'foto-3.JPEG',
  'foto-4.JPEG',
  'foto-5.JPEG',
  'foto-6.JPEG',
  'foto-7.JPEG',
]

const photos = photoFiles.map((fileName, index) => ({
  src: `${baseUrl}photos/${fileName}`,
  alt: `Foto de ustedes ${index + 1}`,
}))

function PhotoGrid() {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const currentPhoto = photos[photoIndex]
  const nextPhoto = photos[(photoIndex + 1) % photos.length]

  const handleNextPhoto = () => {
    setPhotoIndex((previousIndex) => (previousIndex + 1) % photos.length)
  }

  const handlePreviousPhoto = () => {
    setPhotoIndex((previousIndex) => (previousIndex - 1 + photos.length) % photos.length)
  }

  const handleTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    if (touchStartX === null) {
      return
    }

    const touchEndX = event.changedTouches[0].clientX
    const deltaX = touchStartX - touchEndX
    const swipeThreshold = 35

    if (Math.abs(deltaX) < swipeThreshold) {
      setTouchStartX(null)
      return
    }

    if (deltaX > 0) {
      handleNextPhoto()
    } else {
      handlePreviousPhoto()
    }

    setTouchStartX(null)
  }

  return (
    <section className="photo-spotlight-block" aria-label="Recuerdos en fotos">
      <p className="photo-spotlight-title">Nuestros recuerdos</p>
      <button
        className="photo-spotlight-button"
        type="button"
        onClick={handleNextPhoto}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Cambiar a la siguiente foto"
      >
        <div className="photo-stack-frame">
          <div className="photo-stack-card photo-stack-card-next" aria-hidden="true">
            <img className="photo-spotlight-image" src={nextPhoto.src} alt="" loading="lazy" />
          </div>
          <div className="photo-stack-card photo-stack-card-current">
            <img
              className="photo-spotlight-image"
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              loading="lazy"
            />
          </div>
        </div>
      </button>
      <div className="photo-dots" aria-hidden="true">
        {photos.map((photo, index) => (
          <span
            className={`photo-dot ${index === photoIndex ? 'photo-dot-active' : ''}`}
            key={photo.src}
          />
        ))}
      </div>
    </section>
  )
}

export default PhotoGrid
