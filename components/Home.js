import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Login from './Login';
import { useSelector } from 'react-redux';
import user from '../reducers/user';
import { useState } from 'react';

function Home() {
  const user = useSelector(state => state.user.value);

  console.log('user connected:', user);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.leftContainer}>
          <div className={styles.logo}>
            <Image src={'/logo.png'} alt={'logo'} height={150} width={150} />
          </div>
          <div className={styles.bottomInfo}>
            <div className={styles.userInfo}>
              <Image src={'/avatar.png'} alt={'logo'} height={60} width={60} />
              <div className={styles.names}>
                <span className={styles.firstName}>Firstname</span>
                <span className={styles.userName}>@Userame</span>
              </div>
            </div>
            <div className={styles.logout}>
              <button className={styles.logoutBtn}>Dèsconnectaille</button>
            </div>
          </div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.tweetHeader}>
            <h1 className={styles.title}>Movltes gazouillis</h1>
            <div className={styles.tweetInput}>
              <input className={styles.input} placeholder='quest conter gente gueux ?'></input>
              <div className={styles.underInput}>
                <div className={styles.counter}>counter</div>
                <button className={styles.tweetBtn}>Gazouillage</button>
              </div>
            </div>
          </div>
          <div className={styles.tweetContainer}></div>
        </div>
        <div className={styles.rightContainer}>
          <h2 className={styles.title}>Ragots</h2>
          <div className={styles.trendsContainer}>
            <div className={styles.trendingTweet}>
              <span>#Victuailles</span>
              <span>23 gazouillis</span>
            </div>
            <div className={styles.trendingTweet}>
              <span>#Festedelacitrouille</span>
              <span>32 gazouillis</span>
            </div>
            <div className={styles.trendingTweet}>
              <span>#Pendaisondegueux</span>
              <span>18 gazouillis</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
