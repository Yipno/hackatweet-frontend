import Image from 'next/image';
import styles from '../styles/Tweet.module.css';

function Tweet({ firstname, username, date, content, avatar }) {
  return (
    <div className={styles.tweetContainer}>
      <div className={styles.avatar}>
        <Image src={avatar} alt='avatar' height={320} width={320} style={{ borderRadius: '50%' }} />
      </div>
      <div>
        <div className={styles.tweetHead}>
          <div id='firstname' className={styles.name}>
            <h3>{firstname}</h3>
          </div>
          <div id='date' className={styles.date}>
            {date}
          </div>
        </div>
        <div id='username' className={styles.username}>
          @{username}
        </div>
        <div id='content' className={styles.content}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Tweet;
