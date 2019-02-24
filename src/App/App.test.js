import React from 'react';
import { shallow } from 'enzyme';
import { Router, Route, Switch } from 'react-router-dom';
import { App } from './index';

describe('App', () => {
  it('Should render home', () => {
    // Given / When
    const wrapper = shallow(<App />);

    // Then
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(Router)).toHaveLength(1);
    expect(wrapper.find(Switch)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(4);
  });
});
