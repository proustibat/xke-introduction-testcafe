import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import NavBar from '../../components/NavBar';
import sortBy from 'lodash/sortBy';
import cx from 'classnames';

import PostList from '../../components/PostsList';

import styles from './Posts.module.scss';

export class Posts extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    error: null,
    isLoading: false,
    posts: []
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    this.setState(() => ({ isLoading: true }));
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(
        posts => {
          this.setState(() => ({
            isLoading: false,
            posts: sortBy(posts, ['userId', 'id'])
          }));
        },
        error => {
          this.setState(() => ({ isLoading: false, error }));
        }
      );
  };

  render() {
    const { isLoading, error, posts } = this.state;
    const { classes } = this.props;
    const middleIndex = Math.floor(posts.length / 2);
    const arrayOfPosts =
      middleIndex > 0
        ? [posts.slice(0, middleIndex), posts.slice(middleIndex)]
        : [];
    return (
      <div className={styles.Posts}>
        <NavBar />
        <div
          className={cx(styles.content, isLoading && styles.contentForLoader)}
        >
          <div className={styles.headerContainer}>
            <Typography variant="h4">Posts Page</Typography>
            <Link to="/post/add">
              <Fab aria-label="Add" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Link>
          </div>
          {error && (
            <Typography variant="h4" color="error">
              {error}
            </Typography>
          )}
          {posts.length === 0 && arrayOfPosts.length === 0 && !isLoading && (
            <Typography variant="body2">No Posts</Typography>
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
            posts.length > 0 &&
            arrayOfPosts.length > 0 && (
              <Grid container spacing={0} className={classes.grid}>
                {arrayOfPosts.map((list, i) => (
                  <Grid item xs={12} sm={6} key={`post-list-${i}`}>
                    <PostList posts={list} />
                  </Grid>
                ))}
              </Grid>
            )
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(theme => ({
  grid: {
    marginTop: theme.spacing.unit * 2
  },
  loader: {
    color: theme.palette.background.paper
  },
  fab: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main
  }
}))(Posts);
