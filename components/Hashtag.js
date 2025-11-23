import styles from '../styles/Hashtag.module.css';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import Tweet from './Tweet';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Hashtag() {
  const router = useRouter();

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const trends = useSelector(state => state.hashtags.value);
  const [topTrends, setTopTrends] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [tweetsTrends, setTweetsTrends] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    console.log(trends);
    if (trends.length === 0) {
      return;
    }
    const sorted = [...trends].sort((a, b) => b.count - a.count);
    setTopTrends(sorted.slice(0, 3));
  }, []);

  useEffect(() => {
    setTweets(
      tweetsTrends.map((t, i) => {
        return <Tweet key={i} avatar='/avatar.webp' {...t} onDelete={() => handleDelete(t._id)} />;
      })
    );
  }, [tweetsTrends]);

  useEffect(() => {
    const { hashtag } = router.query;
    handleSearch(hashtag);
  }, [router.query]);

  const handleSearch = async hashtag => {
    if (!hashtag.startsWith('#')) {
      hashtag = '#' + hashtag;
    }
    const result = await fetch(
      `http://localhost:3000/tweets?hashtag=${encodeURIComponent(hashtag)}`
    );
    const data = await result.json();
    setTweetsTrends(data.hashtag);
  };

  const handleDelete = id => {
    setTweetsTrends(prev => prev.filter(t => t._id !== id));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Link href='/'>
            <Image src={'/logo.webp'} alt={'logo'} height={200} width={200} />
          </Link>

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
            <h2 className={styles.title}>Quel potin veux-tu quérir ?</h2>
            <div className={styles.tweetInput}>
              <input
                type='text'
                className={styles.input}
                placeholder='Entre ton gribouillis, vaillant ribaud…'
                onChange={e => setSearchInput(e.target.value)}
                value={searchInput}></input>
              <div className={styles.underInput}>
                <button className={styles.tweetBtn} onClick={() => handleSearch(searchInput)}>
                  Quérir
                </button>
              </div>
            </div>
          </div>
          {tweetsTrends.length === 0 ? (
            <div className={styles.empty}>Nul ragots</div>
          ) : (
            <div className={styles.tweetContainer}>{tweets}</div>
          )}
        </div>
        <div className={styles.rightContainer}>
          <h2 className={styles.title}>Ragots Pospulaires</h2>
          <div className={styles.trendsContainer}>
            {topTrends.map(h => {
              return (
                <div className={styles.trendingTweet}>
                  <span>
                    <Link href={{ pathname: '/hashtag', query: { hashtag: h.key } }}>
                      <em>{h.key}</em>
                    </Link>
                  </span>
                  <span>{h.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hashtag;
