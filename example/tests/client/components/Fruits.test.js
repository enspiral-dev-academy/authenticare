import React from 'react'
import authenticare from 'authenticare/client'
import { render, fireEvent, cleanup } from 'react-testing-library'

import {
  // addFruit,
  getFruits,
  updateFruit
  // deleteFruit
} from '../../../client/api'
import Fruits from '../../../client/components/Fruits'

require('babel-polyfill')
jest.mock('authenticare/client')
jest.mock('../../../client/api')

const fruitLink = 'fruit-link'
const selectedName = 'selected-name'
const selectedCalories = 'selected-calories'

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
  const mockGetFruits = jest.fn(() => Promise.resolve(fruits))
  getFruits.mockImplementation(mockGetFruits)
})

afterEach(cleanup)

describe('Fruits component', () => {
  it('renders an <li> for each fruit', () => {
    const { findAllByTestId } = render(<Fruits />)

    return findAllByTestId(fruitLink)
      .then(found => {
        expect(found.length).toBe(3)
      })
  })

  it('displays the fruit when selected', () => {
    const { findAllByTestId, getByTestId } = render(<Fruits />)

    return findAllByTestId(fruitLink)
      .then(found => {
        fireEvent.click(found[0])
        expect(getByTestId(selectedName).value).toBe('orange')
        expect(getByTestId(selectedCalories).value).toBe('11')
      })
  })

  it('can clear the selected fruit', () => {
    const { findAllByTestId, getByTestId } = render(<Fruits />)

    return findAllByTestId(fruitLink)
      .then(found => {
        fireEvent.click(found[0])
        expect(getByTestId(selectedName).value).toBe('orange')
        expect(getByTestId(selectedCalories).value).toBe('11')
        fireEvent.click(getByTestId('clear-button'))
        expect(getByTestId(selectedName).value).toBe('')
        expect(getByTestId(selectedCalories).value).toBe('')
      })
  })

  it.skip('can update a fruit', () => {
    const newFruit = 'new fruit'
    const newCalories = '88'
    updateFruit.mockImplementation(fruit => Promise.resolve(
      fruits.map(f => {
        // console.log(fruit.name, '&', f.name)
        return f.name === fruit.name ? fruit : f
      }))
    )
    authenticare.isAuthenticated.mockImplementation(() => true)
    const {
      // debug,
      findAllByTestId,
      getByTestId } = render(<Fruits />)

    return findAllByTestId(fruitLink)
      .then(found => {
        fireEvent.click(found[0])
        expect(getByTestId(selectedName).value).toBe('orange')
        expect(getByTestId(selectedCalories).value).toBe('11')
        getByTestId(selectedName).value = newFruit
        getByTestId(selectedCalories).value = newCalories
        fireEvent.click(getByTestId('update-button'))
        return findAllByTestId(fruitLink)
          .then(found => {
            // debug()
            // expect(found[0].innerHTML).toBe(newFruit)
          })
      })
  })

  it.skip('can delete a fruit', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)
    const { findAllByTestId, getByTestId } = render(<Fruits />)

    return findAllByTestId(fruitLink)
      .then(found => {
        fireEvent.click(found[0])
        expect(getByTestId(selectedName).value).toBe('orange')
        expect(getByTestId(selectedCalories).value).toBe('11')
        fireEvent.click(getByTestId('delete-button'))

        // asserts
      })
  })

  it.skip('can add a fruit', () => {
    authenticare.isAuthenticated.mockImplementation(() => true)
    const { findAllByTestId, getByTestId } = render(<Fruits />)

    return findAllByTestId(fruitLink)
      .then(found => {
        fireEvent.click(found[0])
        expect(getByTestId(selectedName).value).toBe('orange')
        expect(getByTestId(selectedCalories).value).toBe('11')
        fireEvent.click(getByTestId('add-button'))

        // asserts
      })
  })
})
