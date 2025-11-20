import styles from '../styles/Home.module.css';
import Image from 'next/image';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Login from './Login';

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.imgBackground}></div>
        <div className={styles.container}>
          <div className={styles.branding}>
            <Image src={'/logo.png'} alt={'logo'} height={260} width={260} />
            <h1 className={styles.title}>
              Les Gazouillis{<br />} du {<br />}Royaume
            </h1>
          </div>
          <Login />
        </div>
      </main>
    </div>
  );
}

export default Home;
