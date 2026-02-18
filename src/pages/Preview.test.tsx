import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Preview from './Preview'

describe('Preview Component', () => {
  it('renders all four preview images', () => {
    render(
      <MemoryRouter>
        <Preview />
      </MemoryRouter>
    )
    
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(4)
    expect(images[0]).toHaveAttribute('src', '/book/page 1.jpg')
    expect(images[1]).toHaveAttribute('src', '/book/page 2.jpg')
    expect(images[2]).toHaveAttribute('src', '/book/page 3.jpg')
    expect(images[3]).toHaveAttribute('src', '/book/page 4.jpg')
  })

  it('contains a "ফিরে যান" button linking back to home', () => {
    render(
      <MemoryRouter initialEntries={['/preview']}>
        <Routes>
            <Route path="/preview" element={<Preview />} />
            <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    )
    
    const backBtn = screen.getByRole('link', { name: /ফিরে যান/i })
    expect(backBtn).toBeInTheDocument()
    expect(backBtn).toHaveAttribute('href', '/')
  })
})
