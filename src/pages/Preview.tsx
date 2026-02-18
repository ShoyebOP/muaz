import { Link } from 'react-router-dom'

function Preview() {
  return (
    <div className="site-wrapper" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>বইয়ের ঝলক</h1>
      <p>শীঘ্রই আসছে...</p>
      <Link to="/" className="buy-btn" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>
        ফিরে যান
      </Link>
    </div>
  )
}

export default Preview
