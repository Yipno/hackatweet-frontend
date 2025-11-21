import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const hashtagsSlice = createSlice({
  name: 'hashtags',
  initialState,
  reducers: {
    countHashtag: (state, action) => {
      const hashtag = action.payload;
      const found = state.value.find(h => h.key === hashtag);

      if (!found) {
        state.value.push({ key: hashtag, count: 1 });
      } else {
        found.count += 1;
      }
    },
    resetCount: state => {
      state.value = [];
    },
  },
});

export const { countHashtag, resetCount } = hashtagsSlice.actions;
export default hashtagsSlice.reducer;
