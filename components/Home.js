import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Login from './Login';
import { useSelector } from 'react-redux';
import user from '../reducers/user';
import { useState } from 'react';

function Home() {
  const user = useSelector(state => state.user.value);

  console.log('user connected:', user);

  return <div>HOME</div>;
}

export default Home;
