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
})
