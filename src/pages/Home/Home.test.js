import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './index';
import NavBar from '../../components/NavBar';
import AnimatedButton from '../../components/AnimatedButton';

describe('Home', () => {
  it('Should render the page correctly', () => {
    // Given / When
    const wrapper = shallow(<Home />);

    // Then
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(NavBar)).toHaveLength(1);
    expect(wrapper.find(AnimatedButton)).toHaveLength(1);
  });
});
