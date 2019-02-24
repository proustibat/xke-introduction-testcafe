import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import AnimatedButton from '../../components/AnimatedButton';
import styles from './Home.module.scss';

export class Home extends Component {
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
