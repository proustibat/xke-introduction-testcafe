import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormatIndentIncreaseSharp from '@material-ui/icons/FormatIndentIncreaseSharp';
import styles from '../../pages/Posts/Posts.module.scss';

export class PostsLists extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    const { posts, classes } = this.props;
    return (
      posts.length > 0 && (
        <List className={classes.root} dense={true}>
          {posts.map(post => (
            <Link key={post.id} to={`/post/${post.id}`} className={styles.link}>
              <ListItem button alignItems="center">
                <ListItemIcon className={classes.icon}>
                  <FormatIndentIncreaseSharp />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ color: 'primary' }}
                  primary={post.title}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      )
    );
  }
}

export default withStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.primary.main}`,
    borderRight: `1px solid ${theme.palette.primary.main}`
  },
  icon: {
    color: theme.palette.primary.main
  }
}))(PostsLists);
