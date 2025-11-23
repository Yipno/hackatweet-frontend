import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import hashtags from '../reducers/hashtags';
import likes from '../reducers/likes';

const reducers = combineReducers({ user, hashtags, likes });
const persistConfig = { key: 'Gazouillis_du_Royaume', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>Gazouillis du Royaume</title>
            <meta description='tweeter si ca avait existé au Xe siècle'></meta>
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
