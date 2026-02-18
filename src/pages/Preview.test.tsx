import { render, screen, fireEvent } from '@testing-library/react'
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

  it('navigates to next and previous images', () => {
    render(
      <MemoryRouter>
        <Preview />
      </MemoryRouter>
    )
    
    const nextBtn = screen.getByLabelText(/Next page/i)
    const prevBtn = screen.getByLabelText(/Previous page/i)
    const track = screen.getByRole('img', { name: /Page 1/i }).closest('.carousel-track')

    expect(track).toHaveStyle('transform: translateX(-0%)')

    fireEvent.click(nextBtn)
    expect(track).toHaveStyle('transform: translateX(-100%)')

    fireEvent.click(prevBtn)
    expect(track).toHaveStyle('transform: translateX(-0%)')
  })

  it('navigates via dots', () => {
    render(
      <MemoryRouter>
        <Preview />
      </MemoryRouter>
    )
    
    const dots = screen.getAllByLabelText(/Go to page/i)
    const track = screen.getByRole('img', { name: /Page 1/i }).closest('.carousel-track')

    fireEvent.click(dots[2])
    expect(track).toHaveStyle('transform: translateX(-200%)')
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
