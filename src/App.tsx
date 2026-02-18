import { useState, useEffect } from 'react'
import { Sun, Moon, ShoppingCart, BookOpen, Heart, Sparkles, Truck, ShieldCheck, Star, X, Loader2 } from 'lucide-react'
import './App.css'
import bookData from './book.json'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderCount, setOrderCount] = useState(191)

  const [formData, setOrderData] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  })

  // Fetch global count on mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/get-count')
        const data = await res.json()
        if (data.count) {
          setOrderCount(data.count)
        }
      } catch (err) {
        console.error('Failed to fetch global count', err)
      }
    }
    fetchCount()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOrderData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          bookName: bookData.name,
          totalAmount: bookData.price.discounted + bookData.delivery.charge
        }),
      })

      if (response.ok) {
        alert('আপনার অর্ডারের জন্য ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।')
        setIsModalOpen(false)
        // Optimistic update
        setOrderCount(prev => prev + 1)
        setOrderData({ name: '', phone: '', address: '', email: '' })
      } else {
        const errorData = await response.json()
        alert(`অর্ডারটি সম্পন্ন করা সম্ভব হয়নি: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।')
    } finally {
      setIsSubmitting(false)
    }
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

              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontWeight: '600', fontSize: '1rem' }}>
                <Star size={18} fill="currentColor" /> {orderCount} জন ইতিমধেই অর্ডার করেছেন
              </div>
              
              <div className="pricing-box">
                <div className="price-info">
                  <span className="price-now">{bookData.price.discounted} {bookData.price.currency}</span>
                  <span className="price-was">{bookData.price.normal} {bookData.price.currency}</span>
                </div>
                <button className="buy-btn" onClick={() => setIsModalOpen(true)}>
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

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
              <h2 className="modal-title">অর্ডার ফর্ম</h2>
              <form className="order-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">আপনার নাম *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder="নাম লিখুন" disabled={isSubmitting} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">ফোন নম্বর *</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="ফোন নম্বর লিখুন" disabled={isSubmitting} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">ঠিকানা *</label>
                  <textarea id="address" name="address" required value={formData.address} onChange={handleInputChange} rows={3} placeholder="সম্পূর্ণ ঠিকানা লিখুন" disabled={isSubmitting}></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="email">ইমেইল (ঐচ্ছিক)</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="ইমেইল লিখুন" disabled={isSubmitting} />
                </div>

                <div className="billing-summary">
                  <div className="billing-row">
                    <span>বইয়ের মূল্য:</span>
                    <span>{bookData.price.discounted} {bookData.price.currency}</span>
                  </div>
                  <div className="billing-row">
                    <span>ডেলিভারি চার্জ:</span>
                    <span>{bookData.delivery.charge} {bookData.delivery.currency}</span>
                  </div>
                  <div className="billing-row total">
                    <span>সর্বমোট:</span>
                    <span>{bookData.price.discounted + bookData.delivery.charge} {bookData.price.currency}</span>
                  </div>
                </div>

                <button type="submit" className="confirm-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      অর্ডার প্রসেস হচ্ছে...
                    </>
                  ) : (
                    'অর্ডার নিশ্চিত করুন'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

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
