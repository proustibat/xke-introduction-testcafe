import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { ReactComponent as Logo } from '../../assets/svg/xebia-logotype-pos.svg';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';

export const NavBar = ({ headline, classes, backToPostsPage }) => {
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>
        <Typography variant="h6" color="primary" className={classes.grow}>
          {headline}
        </Typography>
        {backToPostsPage && (
          <Link to="/posts">
            <IconButton
              color="primary"
              className={classes.button}
              aria-label="Back"
            >
              <ArrowBack />
            </IconButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  headline: PropTypes.string,
  classes: PropTypes.object.isRequired,
  backToPostsPage: PropTypes.bool
};

NavBar.defaultProps = {
  headline: 'Introduction to TestCafe',
  backToPostsPage: false
};
export default withStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  },
  button: {}
}))(NavBar);
