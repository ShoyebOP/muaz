import { useState, useEffect } from 'react'
import { Sun, Moon, ShoppingCart, BookOpen, Heart, Sparkles, Truck, ShieldCheck, Star } from 'lucide-react'
import './App.css'
import bookData from './book.json'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if the user hasn't manually set a preference in this session
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="site-wrapper">
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo">{bookData.name}</div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              <Moon size={22} strokeWidth={2.5} fill="currentColor" />
            ) : (
              <Sun size={22} strokeWidth={2.5} fill="currentColor" />
            )}
          </button>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="image-area">
              <div className="book-image-container">
                <img src="/book/book.jpg" alt={bookData.name} className="book-image" />
              </div>
            </div>

            <div className="content-area">
              <div className="title-container">
                <div className="title-header">
                  <h1 className="title">{bookData.name}</h1>
                  <div className="author-wrapper">
                    <span className="author-line">{bookData.author}</span>
                  </div>
                </div>
              </div>
              
              <div className="desc">
                <p>{bookData.description}</p>
              </div>
              
              <div className="pricing-box">
                <div className="price-info">
                  <span className="price-now">{bookData.price.discounted} {bookData.price.currency}</span>
                  <span className="price-was">{bookData.price.normal} {bookData.price.currency}</span>
                </div>
                <button className="buy-btn">
                  <ShoppingCart size={22} strokeWidth={2.5} />
                  বইটি অর্ডার করুন
                </button>
              </div>
              
              <div style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--color-text-muted)', fontSize: '0.9rem', justifyContent: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Truck size={16} /> ডেলিভারি মাত্র {bookData.delivery.charge} {bookData.delivery.currency}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} /> ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container features-grid">
            <div className="feature-item">
              <div className="icon-box"><BookOpen size={40} strokeWidth={2} /></div>
              <h3>২০০ পৃষ্ঠার রোমাঞ্চ</h3>
              <p>একটি দীর্ঘ ও গভীর আত্ম-অনুানুসন্ধানের যাত্রা যা আপনাকে ভাবিয়ে তুলবে প্রতি পাতায়।</p>
            </div>
            <div className="feature-item">
              <div className="icon-box"><Heart size={40} strokeWidth={2} /></div>
              <h3>আত্ম-স্বীকৃতির গল্প</h3>
              <p>ভয় ও ভাঙন পেরিয়ে নিজের পক্ষে দাঁড়িয়ে ওঠার এক অনন্য অনুপ্রেরণামূলক কাহিনী।</p>
            </div>
            <div className="feature-item">
              <div className="icon-box"><Sparkles size={40} strokeWidth={2} /></div>
              <h3>বাস্তব উপলব্ধি</h3>
              <p>কোনো অলৌকিক পরিবর্তন নয়, বরং ধাপে ধাপে সচেতন হয়ে ওঠার এক জীবন্ত প্রক্রিয়া।</p>
            </div>
          </div>
        </section>

        <section className="banner-section">
          <div className="container banner-text">
            <h2>লেখক পরিচিতি</h2>
            <p style={{ fontSize: '1.3rem', fontStyle: 'italic', opacity: '0.9' }}>
              "এই বইটি কেবল একটি গল্প নয়; এটি ভেতরের শক্তিকে জাগিয়ে তোলার একটি যাত্রা।" <br />
              <span style={{ color: 'var(--color-gold)', fontWeight: '700', marginTop: '1rem', display: 'block' }}>— {bookData.author}</span>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {bookData.name}. All rights reserved.</p>
          <div className="badges">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={14} fill="currentColor" /> প্রিমিয়াম কোয়ালিটি</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={14} /> নিরাপদ পেমেন্ট</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
