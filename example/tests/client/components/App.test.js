import React from 'react'
import { mount } from 'enzyme'

import App from '../../../client/components/App'
import Fruits from '../../../client/components/Fruits'

// Prevent <Fruits> from calling the API
Fruits.prototype.componentDidMount = () => {}

test('page header includes fruit', () => {
  const wrapper = mount(<App />)
  const h1 = wrapper.find('h1')
  expect(h1.text()).toMatch(/Fruit/)
})
