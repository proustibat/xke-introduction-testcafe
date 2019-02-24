import React from 'react';
import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { ReactComponent as Logo } from '../../assets/svg/xebia-logotype-pos.svg';
import { Link } from 'react-router-dom';
import { NavBar } from './index';

const props = {
  classes: {}
};

describe('NavBar', () => {
  it('Should render the component correctly', () => {
    // Given / When
    const headline = 'Breathing underwater';
    const wrapper = shallow(<NavBar headline={headline} {...props} />);

    // Then
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(Toolbar)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Link).prop('to')).toBe('/');
    expect(wrapper.find(Logo)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(
      wrapper
        .find(Typography)
        .children()
        .text()
    ).toBe(headline);
    expect(wrapper.find(IconButton)).toHaveLength(0);
    expect(wrapper.find(ArrowBack)).toHaveLength(0);
  });

  it('Should display the back button if prop is true', () => {
    // Given / When
    const wrapper = shallow(<NavBar {...props} backToPostsPage={true} />);

    // Then
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(
      wrapper
        .find(Link)
        .at(0)
        .prop('to')
    ).toBe('/');
    expect(
      wrapper
        .find(Link)
        .at(1)
        .prop('to')
    ).toBe('/posts');
    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(ArrowBack)).toHaveLength(1);
  });

  it('Should render the default headline', () => {
    // Given / When
    const wrapper = shallow(<NavBar {...props} />);

    // Then
    expect(
      wrapper
        .find(Typography)
        .children()
        .text()
    ).toBe(NavBar.defaultProps.headline);
  });
});
