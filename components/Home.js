import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useState, useEffect } from 'react';
import LastTweets from './LastTweets';
import Link from 'next/link';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const trends = useSelector(state => state.hashtags.value);
  const [tweet, setTweet] = useState('');
  const [newTweet, setNewTweet] = useState(null);
  const [topTrends, setTopTrends] = useState(trends);

  const sendTweet = async content => {
    if (content.length > 280 || !content) {
      alert('Sire, estoy moultes palabres !');
      return;
    } else {
      const result = await fetch(`http://localhost:3000/tweets/newtweet/${user.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await result.json();
      data.tweet.user = user.username;
      // console.log(data.tweet);
      setNewTweet(data.tweet);
      setTweet('');
    }
  };

  useEffect(() => {
    if (trends.length === 0) {
      return;
    }
    const sorted = [...trends].sort((a, b) => b.count - a.count);
    setTopTrends(sorted.slice(0, 3));
  }, [trends]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Image priority='true' src={'/logo.webp'} alt={'logo'} height={200} width={200} />

          <div className={styles.bottomInfo}>
            <div className={styles.userInfo}>
              <Image
                src={'/avatar.webp'}
                alt={'logo'}
                height={60}
                width={60}
                style={{ borderRadius: '50%' }}
              />
              <div className={styles.names}>
                <span className={styles.firstName}>{user.firstname}</span>
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
                maxLength='280'
                required
                style={{ resize: 'none' }}
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
            {topTrends.map((h, i) => {
              return (
                <div key={i} className={styles.trendingTweet}>
                  <span>
                    <Link href={{ pathname: '/hashtag', query: { hashtag: h.key } }}>
                      <em>{h.key}</em>
                    </Link>
                  </span>
                  <span>{h.count}</span>
                </div>
              );
            })}
            {/* <div className={styles.trendingTweet}>
              <span>
                <em>#Festedelacitrouille</em>
              </span>
              <span>18 gazouillis</span>
            </div>
            <div className={styles.trendingTweet}>
              <span>
                <em>#Pendaisondegueux</em>
              </span>
              <span>9 gazouillis</span>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
