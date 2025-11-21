import styles from '../styles/Hashtag.module.css';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/user';

function Hashtag() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
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
                placeholder='Entre ton gribouillis, vaillant ribaud…'></input>
              <div className={styles.underInput}>
                <button className={styles.tweetBtn}>Quérir</button>
              </div>
            </div>
          </div>
          <div className={styles.tweetContainer}></div>
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

export default Hashtag;
