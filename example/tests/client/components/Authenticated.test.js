import React from 'react'
import authenticare from 'authenticare/client'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/react'

import {
  IfAuthenticated,
  IfNotAuthenticated
} from '../../../client/components/Authenticated'

expect.extend({ toBeInTheDocument })

jest.mock('authenticare/client')

afterEach(cleanup)

describe('IfAuthenticated component', () => {
  it('displays children when authenticated', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)

    const { getByTestId } = render((
      <IfAuthenticated>
        <div data-testid="test">test</div>
      </IfAuthenticated>
    ))

    expect(getByTestId('test')).toBeInTheDocument()
  })

  it('returns null when not authenticated', () => {
    authenticare.isAuthenticated.mockImplementation(() => false)

    const { queryByTestId } = render((
      <IfAuthenticated>
        <div data-testid="test">test</div>
      </IfAuthenticated>
    ))

    expect(queryByTestId('test')).not.toBeInTheDocument()
  })
})

describe('IfNotAuthenticated component', () => {
  it('displays children when not authenticated', () => {
    authenticare.isAuthenticated.mockImplementation(() => false)

    const { getByTestId } = render((
      <IfNotAuthenticated>
        <div data-testid='test'>test</div>
      </IfNotAuthenticated>
    ))

    expect(getByTestId('test')).toBeInTheDocument()
  })

  it('returns null when authenticated', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)

    const { queryByTestId } = render((
      <IfNotAuthenticated>
        <div data-testid='test'>test</div>
      </IfNotAuthenticated>
    ))

    expect(queryByTestId('test')).not.toBeInTheDocument()
  })
})
