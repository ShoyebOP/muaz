import { useState, useEffect } from 'react'
import { Sun, Moon, ShoppingCart } from 'lucide-react'
import './App.css'
import bookData from './book.json'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="container">
      <header>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      <main className="hero">
        <div className="book-image-container">
          <img src="/book/book.jpg" alt={bookData.name} className="book-image" />
        </div>

        <div className="book-info">
          <h1>{bookData.name}</h1>
          <p className="author">by {bookData.author}</p>
          <p className="description">{bookData.description}</p>
          
          <div className="pricing">
            <span className="current-price">{bookData.price.discounted} {bookData.price.currency}</span>
            <span className="old-price">{bookData.price.normal} {bookData.price.currency}</span>
          </div>

          <button className="order-button">
            <ShoppingCart size={20} style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle' }} />
            Order Now
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
