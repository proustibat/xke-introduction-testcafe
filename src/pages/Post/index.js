import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import cx from 'classnames';

import NavBar from '../../components/NavBar';

import styles from './Post.module.scss';

export class Post extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    error: null,
    isLoading: false,
    post: null
  };

  constructor(props) {
    super(props);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidMount() {
    const { match } = this.props;
    const postId = get(match, 'params.id');
    if (postId) {
      this.fetchPost({ postId });
    } else {
      this.setState(() => ({ error: 'It seems you are lost' }));
    }
  }

  fetchPost({ postId }) {
    this.setState(() => ({ isLoading: true }));
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(
        post => {
          this.setState(() => ({ isLoading: false, post }));
        },
        error => {
          this.setState(() => ({ isLoading: false, error }));
        }
      );
  }

  renderPost = () => {
    const { post } = this.state;
    return (
      <Fragment>
        {post.title && <Typography variant="h4">{post.title}</Typography>}
        <Paper className={styles.paperPost}>
          {post.body && (
            <Typography variant="body2" align="justify">
              {post.body}
            </Typography>
          )}
          {post.userId && (
            <Typography variant="caption" align="right">{`by user: ${
              post.userId
            }`}</Typography>
          )}
        </Paper>
      </Fragment>
    );
  };

  render() {
    const { isLoading, error, post } = this.state;
    const { classes } = this.props;
    return (
      <div className={styles.Post}>
        <NavBar backToPostsPage={true} />
        <div
          className={cx(styles.content, isLoading && styles.contentForLoader)}
        >
          {error && (
            <Typography variant="h4" color="error">
              {error}
            </Typography>
          )}
          {isEmpty(post) && !isLoading && (
            <Typography variant="body2">No data for this post</Typography>
          )}
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <CircularProgress
                color="secondary"
                size={80}
                thickness={2}
                className={classes.loader}
              />
            </div>
          ) : (
            post && this.renderPost()
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(theme => ({
  loader: {
    color: theme.palette.background.paper
  }
}))(Post);
