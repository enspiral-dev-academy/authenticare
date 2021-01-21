import React from 'react'
import authenticare from 'authenticare/client'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import Nav from './Nav'

jest.mock('authenticare/client')

describe('Nav component', () => {
  it('logs off when log off link is clicked', () => {
    const mockLogOff = jest.fn()
    authenticare.logOff.mockImplementation(mockLogOff)
    authenticare.isAuthenticated.mockImplementation(() => true)

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )

    user.click(screen.getByRole('link', { name: /log off/i }))

    expect(mockLogOff).toHaveBeenCalled()
    expect(authenticare.isAuthenticated).toHaveBeenCalledTimes(2)
  })
})
