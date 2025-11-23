import Tweet from './Tweet';
import styles from '../styles/LastTweets.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countHashtag } from '../reducers/hashtags';

const LastTweets = ({ newTweet }) => {
  const dispatch = useDispatch();
  const userLog = useSelector(state => state.user.value);
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    //GET ALL TWEETS
    if (userLog.token && !newTweet) {
      fetch('http://localhost:3000/tweets')
        .then(result => result.json())
        .then(data => {
          data.allTweets.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAllTweets(data.allTweets);
        });
    }
    if (newTweet) {
      const tweetToPost = { firstname: userLog.firstname, username: userLog.username, ...newTweet };
      console.log('tweetToPost: ', tweetToPost);
      setAllTweets(prev => [tweetToPost, ...prev]);
      dispatch(countHashtag(allTweets));
    }
  }, [userLog.token, newTweet]);

  useEffect(() => {
    dispatch(countHashtag(allTweets));
  }, [allTweets]);

  const handleDelete = id => {
    setAllTweets(prev => prev.filter(t => t._id !== id));
  };

  return (
    <>
      <section className={styles.main}>
        {allTweets.map((tweet, i) => {
          return (
            <Tweet
              key={i}
              avatar='/avatar.webp'
              {...tweet}
              onDelete={() => handleDelete(tweet._id)}
            />
          );
        })}
      </section>
    </>
  );
};

export default LastTweets;
