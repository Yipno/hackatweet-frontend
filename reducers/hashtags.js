import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const hashtagsSlice = createSlice({
  name: 'hashtags',
  initialState,
  reducers: {
    countHashtag: (state, action) => {
      // reset le compteur
      // envoyer le tableau avec tous les tweets
      // compter les hashtag unique par tweet
      // renvoyer le tableau d'objets avec le compteur a jour

      //pattern hashtag
      const pattern = /(#(?:[^\x00-\x7F]|\w)+)/g;
      //remise a zero compteur
      state.value = [];

      const tweets = action.payload;
      // retourne un tableau de tableaux avec chaque hashtag unique par tweet (pas de doublon par tweet)
      const uniqueTags = tweets.map(t => {
        const matches = t.content.match(pattern) || [];
        return [...new Set(matches)];
      });
      // pour chaque tableau renvoie un objet key: hashtag, count : x, si l'objet existe deja on increment count.
      const allTags = uniqueTags.flatMap(tags => tags);
      const map = new Map(); // on crée une nouvelle map;
      for (let tag of allTags) {
        map.set(tag, (map.get(tag) || 0) + 1); // .set ajoute ou met a jour un element .get cherche la valeur, si undefined on met a zero puis +1
      }

      // transforme la map en tableau [[hashtag, count]] en [{key: hashtag, count: count}]
      const result = [...map.entries()].map(([key, count]) => ({ key, count }));
      state.value = result;
    },
    // resetCount: state => {
    //   console.log('reset');
    //   state.value = [];
    // },
  },
});

export const { countHashtag } = hashtagsSlice.actions;
export default hashtagsSlice.reducer;
