/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from '../App';

describe('App', () => {

  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  
  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})



