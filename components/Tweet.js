import Image from 'next/image';
import styles from '../styles/Tweet.module.css';
import { FaHeart } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';

function Tweet({ user, date, content, avatar }) {
  const highlightTags = text => {
    const pattern = /(#(?:[^\x00-\x7F]|\w)+)/;
    return text.split(' ').map((w, i) => (pattern.test(w) ? <em key={i}>{w}</em> : w + ' '));
  };

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.avatar}>
        <Image src={avatar} alt='avatar' height={80} width={80} style={{ borderRadius: '50%' }} />
      </div>
      <div className={styles.tweetContent}>
        <div className={styles.tweetHead}>
          <div id='firstname' className={styles.name}>
            <h3>{user.firstname}</h3>
          </div>
          <div id='date' className={styles.date}>
            <Moment fromNow>{date}</Moment>
          </div>
        </div>
        <div id='username' className={styles.username}>
          @{user.username}
        </div>
        <div id='content' className={styles.content}>
          {highlightTags(content)}
        </div>
        <div className={styles.icons}>
          <FaHeart className={styles.heart} />
          0
          <FaTrash className={styles.trash} />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
