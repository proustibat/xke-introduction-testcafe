import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { AnimatedButton } from './index';

describe('AnimatedButton', () => {
  it('Should render the component correctly', () => {
    // Given / When
    const wrapper = shallow(<AnimatedButton label="blabliblou" url="/hello" />);

    // Then
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Link).prop('to')).toBe('/hello');
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(
      wrapper
        .find(Typography)
        .children()
        .text()
    ).toBe('blabliblou');
  });
});
