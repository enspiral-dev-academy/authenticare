import React from 'react'
import { shallow, mount } from 'enzyme'

import Fruits from '../../../client/components/Fruits'

// Prevent <Fruits> from calling the API
Fruits.prototype.componentDidMount = () => {}

test('<Fruits> root contains a list', () => {
  const wrapper = shallow(<Fruits />)
  const root = wrapper.find('ul')
  expect(root.length).toBe(1)
})

test('renders an <li> for each fruit', () => {
  const fruits = [
    {
      id: 1,
      name: 'orange'
    }, {
      id: 2,
      name: 'persimmons'
    }, {
      id: 3,
      name: 'kiwi fruit'
    }
  ]
  const wrapper = mount(<Fruits />)
  wrapper.setState({ fruits })
  expect(wrapper.find('li').length).toBe(3)
})
