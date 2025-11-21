import Tweet from './Tweet';
import styles from '../styles/LastTweets.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCount } from '../reducers/hashtags';

const LastTweets = ({ newTweet }) => {
  const dispatch = useDispatch();
  const userLog = useSelector(state => state.user.value);
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    //GET ALL TWEETS
    dispatch(resetCount());
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
    }
  }, [userLog.token, newTweet]);

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
        {/* <Tweet
          avatar={'/avatar.webp'}
          firstname={'John'}
          username={'john'}
          date={'now'}
          content={
            'En troupe bien ordonnée nul ne peux nous vassaliser ! En la basse-fosse du bourg, on embrase la poudrière, et les sergents en habits simples déjà nous quêtent et épient. #TroupeOrdonnée'
          }
        />
        <div className={styles.separator}></div>
        <Tweet
          avatar={'/avatar.webp'}
          firstname={'John'}
          username={'john'}
          date={'now'}
          content={
            'Oye, ma douce damoiselle, mon destrier gris Nardot, bien sûr qu’ils m’ont manqué l’coup. Soleil en ma visière, longant la Grand’Route du Pradou, destrier à vitesses enchantées (Etriers pro). À rebours tu chevauches, ma mie, tu vas à contre-voie. Vil manant, où étais-tu donc quand je mettais sept deniers d’huile à torche dans mon coursier, dis-moi ?'
          }
        />
         */}
      </section>
    </>
  );
};

export default LastTweets;
