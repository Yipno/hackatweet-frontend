import Image from 'next/image';
import styles from '../styles/Tweet.module.css';
import { FaHeart } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { addLike, removeLike } from '../reducers/likes';

function Tweet({ firstname, username, user, date, content, avatar, _id, onDelete, likes }) {
  const dispatch = useDispatch();
  const userLog = useSelector(state => state.user.value);

  const highlightTags = text => {
    const pattern = /(#(?:[^\x00-\x7F]|\w)+)/;

    return text.split(' ').map((w, i) =>
      pattern.test(w) ? (
        <Link key={i} href={{ pathname: '/hashtag', query: { hashtag: w } }}>
          <em>{w + ' '}</em>
        </Link>
      ) : (
        w + ' '
      )
    );
  };

  const handleDelete = async () => {
    const result = await fetch(`http://localhost:3000/tweets/${_id}`, {
      method: 'DELETE',
    });
    const data = await result.json();
    // console.log(data);
    if (data.result) {
      onDelete();
    }
  };

  // console.log(user.username, username, userLog.username);
  const [like, setLike] = useState(likes);
  const likeCount = like.length;
  const isLiked = like.includes(userLog.id);

  let likeStyle = {};
  if (isLiked) {
    likeStyle = { color: '#c20404ff' };
  }

  // CLIC SUR ICONE LIKE
  const handleLikeClick = () => {
    if (!userLog.token) {
      return;
    }

    // SI DEJA LIKE, DISLIKE + DELETE BDD
    if (isLiked) {
      fetch(`http://localhost:3000/tweets/dislike/${userLog.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: _id }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
          if (data.result) {
            dispatch(removeLike(user));
            console.log('user', user);
            setLike(data => data.filter(id => id !== userLog.id));
            console.log('like', like);
          }
        });
    } else {
      // AJOUT LIKE COMPTEUR + BDD
      fetch(`http://localhost:3000/tweets/like/${userLog.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: _id }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
          if (data.result) {
            dispatch(addLike(user));
            console.log('user', user);
            setLike(data => [...data, userLog.id]);
          }
        });
    }
  };

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
          <FaHeart onClick={() => handleLikeClick()} style={likeStyle} className={styles.heart} />
          {likeCount}
          {(username === userLog.username || user.username === userLog.username) && (
            <FaTrash className={styles.trash} onClick={() => handleDelete()} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tweet;
