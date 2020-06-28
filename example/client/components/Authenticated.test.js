import React from 'react'
import '@testing-library/jest-dom'
import authenticare from 'authenticare/client'
import { render, screen } from '@testing-library/react'

import {
  IfAuthenticated,
  IfNotAuthenticated
} from './Authenticated'

jest.mock('authenticare/client')

describe('IfAuthenticated component', () => {
  it('displays children when authenticated', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)

    render((
      <IfAuthenticated>
        <div data-testid="test">test</div>
      </IfAuthenticated>
    ))

    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  it('returns null when not authenticated', () => {
    authenticare.isAuthenticated.mockImplementation(() => false)

    render((
      <IfAuthenticated>
        <div data-testid="test">test</div>
      </IfAuthenticated>
    ))

    expect(screen.queryByTestId('test')).not.toBeInTheDocument()
  })
})

describe('IfNotAuthenticated component', () => {
  it('displays children when not authenticated', () => {
    authenticare.isAuthenticated.mockImplementation(() => false)

    render((
      <IfNotAuthenticated>
        <div data-testid='test'>test</div>
      </IfNotAuthenticated>
    ))

    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  it('returns null when authenticated', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)

    render((
      <IfNotAuthenticated>
        <div data-testid='test'>test</div>
      </IfNotAuthenticated>
    ))

    expect(screen.queryByTestId('test')).not.toBeInTheDocument()
  })
})
