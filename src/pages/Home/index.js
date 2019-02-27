import React, { Component } from 'react';
import ReactGA from 'react-ga';
import NavBar from '../../components/NavBar';
import AnimatedButton from '../../components/AnimatedButton';
import styles from './Home.module.scss';

export class Home extends Component {
  constructor(props) {
    super(props);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  render() {
    return (
      <div className={styles.Home}>
        <NavBar />
        <AnimatedButton label="Start" url="/posts" />
      </div>
    );
  }
}

export default Home;
