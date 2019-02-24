import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from '../../components/NavBar';
import { Post } from './index';
import { posts } from '../../fixtures/data';

const expectedPost = posts[0];

const props = {
  match: { params: { id: 54 } },
  classes: {}
};

describe('Post', () => {
  beforeEach(() => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(expectedPost) })
      );
  });
  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Should render the page correctly', () => {
    // Given / When
    const wrapper = shallow(<Post {...props} />);

    // Then
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(NavBar)).toHaveLength(1);
    expect(wrapper.find(NavBar).prop('backToPostsPage')).toBeTruthy();
  });

  it('Should fetch data, display loader while fetching and save result in state when success', done => {
    // Given / When
    const wrapper = shallow(<Post {...props} />);

    // Then
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/posts/${props.match.params.id}`
    );
    expect(wrapper.state('isLoading')).toBeTruthy();
    expect(wrapper.find(CircularProgress)).toHaveLength(1);

    process.nextTick(() => {
      expect(wrapper.state('post')).toEqual(expectedPost);
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.find(CircularProgress)).toHaveLength(0);
      done();
    });
  });

  it('Should display the post correctly', async () => {
    // Given
    const wrapper = shallow(<Post {...props} />);

    // When
    await wrapper.setState({
      post: expectedPost,
      isLoading: false,
      error: false
    });
    await wrapper.update();

    // Then
    expect(wrapper.find(Typography)).toHaveLength(3);
    const title = wrapper
      .find(Typography)
      .filterWhere(item => item.prop('variant') === 'h4');
    const content = wrapper
      .find(Typography)
      .filterWhere(item => item.prop('variant') === 'body2');
    const author = wrapper
      .find(Typography)
      .filterWhere(item => item.prop('variant') === 'caption');
    expect(title).toHaveLength(1);
    expect(content).toHaveLength(1);
    expect(author).toHaveLength(1);
    expect(title.children().text()).toBe(expectedPost.title);
    expect(content.children().text()).toBe(expectedPost.body);
    expect(author.children().text()).toBe(`by user: ${expectedPost.userId}`);
  });

  it('Should display an error message when fetching failed', done => {
    // Given / When
    global.fetch.mockClear();
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject('problem'));
    const wrapper = shallow(
      <Post {...props} match={{ params: { id: 'unknownId' } }} />
    );

    // Then
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/unknownId'
    );

    expect(wrapper.state('isLoading')).toBeTruthy();
    expect(wrapper.find(CircularProgress)).toHaveLength(1);

    process.nextTick(async () => {
      expect(wrapper.state('error')).toEqual('problem');
      expect(
        wrapper
          .find(Typography)
          .at(0)
          .children()
          .text()
      ).toBe('problem');
      expect(wrapper.state('isLoading')).toBeFalsy();
      expect(wrapper.find(CircularProgress)).toHaveLength(0);
      done();
    });
  });
});
