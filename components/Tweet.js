import Image from 'next/image';
import styles from '../styles/Tweet.module.css';
import { FaHeart } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { countHashtag } from '../reducers/hashtags';

function Tweet({ firstname, username, user, date, content, avatar, _id, onDelete }) {
  const dispatch = useDispatch();
  const userLog = useSelector(state => state.user.value);

  const highlightTags = text => {
    const pattern = /(#(?:[^\x00-\x7F]|\w)+)/;

    return text.split(' ').map((w, i) => (pattern.test(w) ? <em key={i}>{w}</em> : w + ' '));
  };

  const handleDelete = async () => {
    const result = await fetch(`http://localhost:3000/tweets/${_id}`, {
      method: 'DELETE',
    });
    const data = await result.json();
    console.log(data);
    if (data.result) {
      onDelete();
    }
  };

  console.log(user.username, username, userLog.username);

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.avatar}>
        <Image src={avatar} alt='avatar' height={80} width={80} style={{ borderRadius: '50%' }} />
      </div>
      <div className={styles.tweetContent}>
        <div className={styles.tweetHead}>
          <div id='firstname' className={styles.name}>
            <h3>{user.firstname || firstname}</h3>
          </div>
          <div id='date' className={styles.date}>
            <Moment fromNow>{date}</Moment>
          </div>
        </div>
        <div id='username' className={styles.username}>
          @{user.username || username}
        </div>
        <div id='content' className={styles.content}>
          {highlightTags(content)}
        </div>
        <div className={styles.icons}>
          <FaHeart className={styles.heart} />0
          {(username === userLog.username || user.username === userLog.username) && (
            <FaTrash className={styles.trash} onClick={() => handleDelete()} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tweet;
