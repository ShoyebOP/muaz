import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Home from './Home'

describe('Home Component - Phone Validation', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    // Mock global fetch
    vi.stubGlobal('fetch', vi.fn())
    // Default mock for get-count
    ;(fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ count: 191 })
    })
  })

  it('shows the order modal when clicking order button', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const orderBtn = screen.getByRole('button', { name: /বইটি অর্ডার করুন/i })
    fireEvent.click(orderBtn)

    expect(screen.getByText(/অর্ডার ফর্ম/i)).toBeInTheDocument()
  })

  it('prevents submission if phone number is not 11 digits', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /বইটি অর্ডার করুন/i }))

    // Fill other fields
    fireEvent.change(screen.getByLabelText(/আপনার নাম/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/ঠিকানা/i), { target: { value: 'Test Address' } })
    
    // Fill invalid phone (too short)
    const phoneInput = screen.getByLabelText(/ফোন নম্বর/i)
    fireEvent.change(phoneInput, { target: { value: '017112233' } }) // 9 digits

    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    const form = screen.getByLabelText(/ফোন নম্বর/i).closest('form')!
    fireEvent.submit(form)

    // Should show alert and not call fetch for order
    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('১১ ডিজিট হতে হবে'))
    expect(fetch).not.toHaveBeenCalledWith('/api/order', expect.anything())
    
    alertMock.mockRestore()
  })

  it('prevents submission if phone number contains non-numeric characters', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /বইটি অর্ডার করুন/i }))

    // Fill other fields
    fireEvent.change(screen.getByLabelText(/আপনার নাম/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/ঠিকানা/i), { target: { value: 'Test Address' } })
    
    // Fill invalid phone (contains letters)
    const phoneInput = screen.getByLabelText(/ফোন নম্বর/i)
    fireEvent.change(phoneInput, { target: { value: '017112233ab' } })

    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    const form = screen.getByLabelText(/ফোন নম্বর/i).closest('form')!
    fireEvent.submit(form)

    // Should show alert
    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('সঠিক নম্বর লিখুন'))
    expect(fetch).not.toHaveBeenCalledWith('/api/order', expect.anything())
    
    alertMock.mockRestore()
  })

  it('allows submission if phone number is exactly 11 digits', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /বইটি অর্ডার করুন/i }))

    // Fill all fields
    fireEvent.change(screen.getByLabelText(/আপনার নাম/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/ঠিকানা/i), { target: { value: 'Test Address' } })
    
    // Fill valid phone
    const phoneInput = screen.getByLabelText(/ফোন নম্বর/i)
    fireEvent.change(phoneInput, { target: { value: '01711223344' } }) // 11 digits

    // Mock order response
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'success' })
    })

    const submitBtn = screen.getByRole('button', { name: /অর্ডার নিশ্চিত করুন/i })
    fireEvent.click(submitBtn)

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/order', expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('01711223344')
        }))
    })
  })
})
