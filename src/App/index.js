import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import withRoot from '../withRoot';
import Home from '../pages/Home';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import AddPost from '../pages/AddPost';

export const history = createHistory({
  basename: process.env.PUBLIC_URL
});

export class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-40833314-2');
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/post/add" component={AddPost} />
          <Route exact path="/post/:id" component={Post} />
        </Switch>
      </Router>
    );
  }
}

export default withRoot(App);
