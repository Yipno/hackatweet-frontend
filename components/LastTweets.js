import Tweet from './Tweet';
import styles from '../styles/LastTweets.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import user from '../reducers/user';

const LastTweets = () => {
  const user = useSelector(state => state.user.value);
  const [allTweets, setAllTweets] = useState(['test']);

  useEffect(() => {
    //GET ALL TWEETS
    if (user.token) {
      fetch('http://localhost:3000/tweets')
        .then(result => result.json())
        .then(data => {
          setAllTweets(() =>
            data.allTweets.map((tweet, i) => {
              return <Tweet key={i} avatar='/avatar.webp' {...tweet} />;
            })
          );
        });
    }
  }, [user]);

  return (
    <div>
      <section className={styles.main}>
        {allTweets}
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
    </div>
  );
};

export default LastTweets;
