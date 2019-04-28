import React from 'react'
import authenticare from 'authenticare/client'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Nav from '../../../client/components/Nav'

jest.mock('authenticare/client')

afterEach(cleanup)

describe('Nav component', () => {
  it('logs off when log off link is clicked', () => {
    const mockLogOff = jest.fn()
    authenticare.logOff.mockImplementation(mockLogOff)
    authenticare.isAuthenticated.mockImplementation(() => true)

    const { getByTestId } = render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('logoff'))

    expect(mockLogOff).toBeCalled()
    expect(authenticare.isAuthenticated).toBeCalledTimes(2)
  })
})
