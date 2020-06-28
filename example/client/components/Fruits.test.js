import React from 'react'
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'

import authenticare from 'authenticare/client'

import {
  addFruit,
  getFruits,
  updateFruit,
  deleteFruit
} from '../api'
import Fruits from './Fruits'

jest.mock('authenticare/client')
jest.mock('../api')

const fruitLink = 'fruit-link'
const selectedName = 'selected-name'
const selectedCalories = 'selected-calories'
const addingName = 'adding-name'
const addingCalories = 'adding-calories'
const addFruitButton = {name: /add fruit/i}
const updateFruitButton = {name: /update fruit/i}
const deleteFruitButton = {name: /delete fruit/i}
const clearSelectionButton = {name: /clear selection/i}

const fruits = [
  {
    id: 1,
    name: 'orange',
    calories: 11
  }, {
    id: 2,
    name: 'persimmons',
    calories: 22
  }, {
    id: 3,
    name: 'kiwi fruit',
    calories: 33
  }
]

beforeEach(() => {
  let mockFruits = [...fruits]
  const mockGetFruits = jest.fn(() => Promise.resolve(mockFruits))
  const mockAddFruit = jest.fn(fruit => {
    fruit.id = mockFruits.length + 1
    mockFruits.push(fruit)
    return Promise.resolve(mockFruits)
  })
  const mockDeleteFruit = jest.fn(id => {
    mockFruits = mockFruits.filter(fruit => fruit.id !== id)
    return Promise.resolve(mockFruits)
  })

  getFruits.mockImplementation(mockGetFruits)
  addFruit.mockImplementation(mockAddFruit)
  deleteFruit.mockImplementation(mockDeleteFruit)
})

describe('Fruits component', () => {
  it('renders an <li> for each fruit', () => {
    render(<Fruits />)

    return screen.findAllByRole('link')
      .then(links => {
        expect(links).toHaveLength(3)
      })
  })

  it('displays the fruit when selected', () => {
    render(<Fruits />)

    return screen.findAllByRole('link')
      .then(links => {
        user.click(links[0])
        expect(screen.getByLabelText(selectedName)).toHaveValue('orange')
        expect(screen.getByLabelText(selectedCalories)).toHaveValue('11')
      })
  })

  it('can clear the selected fruit', () => {
    render(<Fruits />)

    return screen.findAllByRole('link')
      .then(links => {
        user.click(links[0])
        expect(screen.getByLabelText(selectedName).value).toBe('orange')
        expect(screen.getByLabelText(selectedCalories).value).toBe('11')

        user.click(screen.getByRole('button', clearSelectionButton))
        expect(screen.getByLabelText(selectedName)).toHaveValue('')
        expect(screen.getByLabelText(selectedCalories)).toHaveValue('')
      })
  })

  it('can update a fruit', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)
    updateFruit.mockImplementation(fruit => Promise.resolve(
      fruits.map(f => {
        return f.id === fruit.id ? fruit : f
      }))
    )

    render(<Fruits />)

    return screen.findAllByRole('link')
      .then(links => {
        user.click(links[0])

        const name = screen.getByLabelText(selectedName)
        const calories = screen.getByLabelText(selectedCalories)

        expect(name).toHaveValue('orange')
        expect(calories).toHaveValue('11')

        user.clear(name)
        user.type(name, 'new test fruit')

        user.clear(calories)
        user.type(calories, '88')

        user.click(screen.getByRole('button', updateFruitButton))

        return screen.findAllByRole('link')
      })
      .then(links => {
        expect(links[0]).toHaveTextContent(/^new test fruit$/)
      })
  })

  it('can delete a fruit', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)

    render(<Fruits />)

    return screen.findAllByRole('link')
      .then(links => {
        expect(links).toHaveLength(3)
        user.click(links[0])
        user.click(screen.getByRole('button', deleteFruitButton))
        return waitForElementToBeRemoved(() => screen.getByRole('link', {name: 'orange'}))
      })
      .then(() => screen.findAllByRole('link'))
      .then(links => {
        expect(links).toHaveLength(2)
      })
  })

  it('can add a fruit', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)

    render(<Fruits />)

    return screen.findAllByRole('link')
      .then(links => {
        // make sure we're not starting out with a link to mango
        links.forEach(link => expect(link).not.toHaveTextContent(/mango/i))
      })
      .then(() => {
        user.type(screen.getByLabelText(addingName), 'mango')
        user.type(screen.getByLabelText(addingCalories), '210')
        user.click(screen.getByRole('button', addFruitButton))
        return screen.findByRole('link', {name: /mango/i})
      })
      .then(link => {
        expect(link).toHaveTextContent('mango')
        expect(screen.getAllByRole('link')).toHaveLength(4)
      })
  })
})
