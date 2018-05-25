import React from 'react';
import { shallow } from 'enzyme';

import App from '../../components/App';


describe('App', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot;
  });
});