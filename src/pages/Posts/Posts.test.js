import React from 'react';
import { shallow } from 'enzyme';
import { Posts } from './index';
import NavBar from '../../components/NavBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostList from '../../components/PostsList';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { posts } from '../../fixtures/data';

const props = {
  classes: {}
};

describe('Posts', () => {
  beforeEach(() => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(posts) })
      );
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Should render the page correctly', () => {
    // Given / When
    const wrapper = shallow(<Posts {...props} />);

    // Then
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(NavBar)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Fab)).toHaveLength(1);
    expect(wrapper.find(AddIcon)).toHaveLength(1);
  });

  it('Should fetch data, display loader while fetching and save result in state when success', done => {
    // Given / When
    const wrapper = shallow(<Posts {...props} />);

    // Then
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts'
    );

    expect(wrapper.state('isLoading')).toBeTruthy();
    expect(wrapper.find(CircularProgress)).toHaveLength(1);

    process.nextTick(() => {
      expect(wrapper.state('posts')).toEqual(posts);
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.find(CircularProgress)).toHaveLength(0);
      done();
    });
  });

  it('Should display the list correctly', async () => {
    // Given
    const wrapper = shallow(<Posts {...props} />);

    // When
    await wrapper.setState({ posts, isLoading: false, error: false });
    await wrapper.update();

    // Then
    const GridContainer = wrapper
      .find(Grid)
      .filterWhere(item => item.prop('container') === true);
    const GridItem = wrapper
      .find(Grid)
      .filterWhere(item => item.prop('item') === true);
    expect(GridContainer).toHaveLength(1);
    expect(GridItem).toHaveLength(2);
    GridItem.forEach(item => {
      expect(item.find(PostList)).toHaveLength(1);
    });
  });

  it('Should display an error message when fetching failed', done => {
    // Given / When
    global.fetch.mockClear();
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject('problem'));
    const wrapper = shallow(<Posts {...props} />);

    // Then
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts'
    );

    expect(wrapper.state('isLoading')).toBeTruthy();
    expect(wrapper.find(CircularProgress)).toHaveLength(1);

    process.nextTick(async () => {
      await wrapper.update();
      expect(wrapper.state('error')).toEqual('problem');
      expect(
        wrapper
          .find(Typography)
          .at(1)
          .children()
          .text()
      ).toBe('problem');
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.find(CircularProgress)).toHaveLength(0);
      done();
    });
  });
});
