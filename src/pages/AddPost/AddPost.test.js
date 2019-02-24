import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from '../../components/NavBar';
import { AddPost } from './index';

const props = {
  classes: {}
};

const response = {
  title: 'My title',
  body: 'My body',
  userId: 1
};

describe('AddPost', () => {
  beforeEach(() => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(response) })
      );
    jest.spyOn(toast, 'success');
    jest.spyOn(toast, 'error');
    jest.spyOn(toast, 'dismiss');
  });
  afterEach(() => {
    global.fetch.mockClear();
    toast.success.mockClear();
    toast.error.mockClear();
    toast.dismiss.mockClear();
  });
  it('Should render the page correctly', () => {
    // Given / When
    const wrapper = shallow(<AddPost {...props} />);

    // Then
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(NavBar)).toHaveLength(1);
    expect(wrapper.find(NavBar).prop('backToPostsPage')).toBeTruthy();
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(SendIcon)).toHaveLength(1);
    expect(wrapper.find(ToastContainer)).toHaveLength(1);
  });

  it('Should update the state with the right data when filling inputs', () => {
    // Given
    const wrapper = shallow(<AddPost {...props} />);

    // When
    const title = 'My beautiful title';
    const body = 'My beautiful body';
    wrapper
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: title } });
    wrapper
      .find(TextField)
      .at(1)
      .simulate('change', { target: { value: body } });

    // Then
    expect(wrapper.state()).toEqual({
      title: { value: title, error: false },
      body: { value: body, error: false },
      error: false,
      isLoading: false
    });
  });

  it("Should send the data when clicking on send button, display a loader while fetching post, reset the form when it's done and notify the user", async done => {
    // Given
    const wrapper = shallow(<AddPost {...props} />);
    const state = {
      title: { value: response.title, error: false },
      body: { value: response.body, error: false }
    };
    wrapper.setState(state);

    // When
    await wrapper
      .find(Button)
      .at(0)
      .simulate('click');

    // Then
    const expectedFetchBody = {
      method: 'POST',
      body: JSON.stringify(response),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    };
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      expectedFetchBody
    );
    expect(wrapper.state('isLoading')).toBeTruthy();
    expect(wrapper.find(CircularProgress)).toHaveLength(1);

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        title: { value: '', error: false },
        body: { value: '', error: false },
        isLoading: false,
        error: false
      });
      expect(wrapper.find(CircularProgress)).toHaveLength(0);
      expect(toast.success).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('Should notify error when posting data failed', async done => {
    // Given
    global.fetch.mockClear();
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject('problem'));
    const wrapper = shallow(<AddPost {...props} />);
    const state = {
      title: { value: response.title, error: false },
      body: { value: response.body, error: false }
    };
    wrapper.setState(state);

    // When
    await wrapper
      .find(Button)
      .at(0)
      .simulate('click');

    // Then
    const expectedFetchBody = {
      method: 'POST',
      body: JSON.stringify(response),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    };
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      expectedFetchBody
    );
    expect(wrapper.state('isLoading')).toBeTruthy();
    expect(wrapper.find(CircularProgress)).toHaveLength(1);

    process.nextTick(() => {
      expect(wrapper.state('error')).toEqual('problem');
      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(wrapper.find(CircularProgress)).toHaveLength(0);
      done();
    });
  });

  it('Should not send data and display required fields as error if user tries to send empty fields', async () => {
    // Given
    const wrapper = shallow(<AddPost {...props} />);

    // When
    await wrapper
      .find(Button)
      .at(0)
      .simulate('click');

    // Then
    expect(global.fetch).toHaveBeenCalledTimes(0);
    expect(wrapper.state()).toEqual({
      body: { error: true, value: '' },
      error: false,
      isLoading: false,
      title: { error: true, value: '' }
    });
  });
});
