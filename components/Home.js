import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useState } from 'react';
import LastTweets from './LastTweets';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const [tweet, setTweet] = useState('');
  const [newTweet, setNewTweet] = useState(null);

  const sendTweet = async content => {
    if (content.length > 280) {
      alert('Sire, estoy moultes palabres !');
      return;
    } else {
      console.log(content);

      const result = await fetch(`http://localhost:3000/tweets/newtweet/${user.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await result.json();
      setNewTweet(data.tweet);
      setTweet('');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Image src={'/logo.webp'} alt={'logo'} height={200} width={200} />

          <div className={styles.bottomInfo}>
            <div className={styles.userInfo}>
              <Image
                src={'/avatar2.webp'}
                alt={'logo'}
                height={60}
                width={60}
                style={{ borderRadius: '50%' }}
              />
              <div className={styles.names}>
                <span className={styles.firstName}>Firstname</span>
                <span className={styles.userName}>@{user.username}</span>
              </div>
            </div>

            <button className={styles.logoutBtn} onClick={() => dispatch(logout())}>
              Dèsconnectaille
            </button>
          </div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.tweetHeader}>
            <h2 className={styles.title}>Moultes gazouillis</h2>
            <div className={styles.tweetInput}>
              <textarea
                type='text'
                max='280'
                className={styles.input}
                placeholder='Que veux-tu braire en ceste heure ?'
                onChange={e => setTweet(e.target.value)}
                value={tweet}></textarea>
              <div className={styles.underInput}>
                <div className={styles.counter}>{tweet.length}/280</div>
                <button className={styles.tweetBtn} onClick={() => sendTweet(tweet)}>
                  Gazouillage
                </button>
              </div>
            </div>
          </div>
          <div className={styles.tweetContainer}>
            <LastTweets newTweet={newTweet} />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h2 className={styles.title}>Ragots Pospulaires</h2>
          <div className={styles.trendsContainer}>
            <div className={styles.trendingTweet}>
              <span>
                <em>#Victuailles</em>
              </span>
              <span>23 gazouillis</span>
            </div>
            <div className={styles.trendingTweet}>
              <span>
                <em>#Festedelacitrouille</em>
              </span>
              <span>32 gazouillis</span>
            </div>
            <div className={styles.trendingTweet}>
              <span>
                <em>#Pendaisondegueux</em>
              </span>
              <span>18 gazouillis</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
