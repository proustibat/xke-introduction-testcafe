import React from 'react';
import { shallow } from 'enzyme';
import { PostsLists } from './index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { posts } from '../../fixtures/data';

const props = {
  classes: {},
  posts
};

describe('PostLists', () => {
  it('Should render the component correctly', () => {
    // Given / When
    const wrapper = shallow(<PostsLists {...props} />);

    // Then
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(props.posts.length);
    expect(wrapper.find(ListItemIcon)).toHaveLength(props.posts.length);
    expect(wrapper.find(ListItemText)).toHaveLength(props.posts.length);
    wrapper.find(ListItemText).forEach((item, i) => {
      expect(item.prop('primary')).toBe(props.posts[i].title);
    });
  });

  it('Should return nothing if posts is empty', () => {
    // Given / When
    const wrapper = shallow(<PostsLists {...props} posts={[]} />);

    // Then
    expect(wrapper.find(List)).toHaveLength(0);
  });
});
