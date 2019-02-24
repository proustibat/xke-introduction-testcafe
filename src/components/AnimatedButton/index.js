import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import styles from './AnimatedButton.module.scss';
import { customTheme } from '../../withRoot';

export class AnimatedButton extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  render() {
    const { label, url } = this.props;
    return (
      <div className={styles.wrapper}>
        <Link to={url} className={styles.link}>
          <div
            className={styles.button}
            style={{ backgroundColor: customTheme.palette.secondary.main }}
          >
            <Typography
              className={styles.text}
              style={{ color: customTheme.palette.background.paper }}
              variant="h5"
            >
              {label}
            </Typography>
          </div>
        </Link>
      </div>
    );
  }
}

export default AnimatedButton;
