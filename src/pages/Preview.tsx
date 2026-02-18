import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import '../App.css'

function Preview() {
  const images = [
    '/book/page 1.jpg',
    '/book/page 2.jpg',
    '/book/page 3.jpg',
    '/book/page 4.jpg'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="preview-page">
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo">বইয়ের ঝলক</div>
          <Link to="/" className="modal-close" style={{ position: 'static', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-card-bg)', border: 'var(--border-slim)', width: '42px', height: '42px', borderRadius: '10px' }}>
            <X size={24} />
          </Link>
        </div>
      </nav>

      <main className="preview-main">
        <div className="carousel-container">
          <button className="carousel-control prev" onClick={prevSlide} aria-label="Previous page">
            <ChevronLeft size={32} />
          </button>
          
          <div className="carousel-viewport">
            <div 
              className="carousel-track" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <div className="carousel-slide" key={index}>
                  <img src={src} alt={`Page ${index + 1}`} className="preview-image" />
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-control next" onClick={nextSlide} aria-label="Next page">
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="carousel-dots">
          {images.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" className="buy-btn" style={{ display: 'inline-flex', textDecoration: 'none', padding: '0.8rem 2rem' }}>
            ফিরে যান
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Preview
