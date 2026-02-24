import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App Routing', () => {
  it('renders Home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    // Check for some text from Home.tsx
    expect(screen.getByText(/জন ইতিমধেই অর্ডার করেছেন/i)).toBeInTheDocument()
  })

  it('renders Preview page on /preview route', () => {
    render(
      <MemoryRouter initialEntries={['/preview']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText(/বইয়ের ঝলক/i)).toBeInTheDocument()
  })

  it('contains "পড়ে দেখুন" button linking to /preview', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    const previewBtn = screen.getByRole('link', { name: /পড়ে দেখুন/i })
    expect(previewBtn).toBeInTheDocument()
    expect(previewBtn).toHaveAttribute('href', '/preview')
  })

  it('contains developer attribution in footer with correct link', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    // Check for "made by Shoyeb Morshed" as plain text
    expect(screen.getByText(/made by Shoyeb Morshed/i)).toBeInTheDocument()
    // Check for Facebook link with new promotional text
    const facebookLink = screen.getByRole('link', { name: /Facebook/i })
    expect(facebookLink).toBeInTheDocument()
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/shoyeb.morshed.3')
    expect(facebookLink).toHaveAttribute('target', '_blank')
  })
})
