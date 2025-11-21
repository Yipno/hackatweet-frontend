import styles from '../styles/Login.module.css';
import Image from 'next/image';

import SignUp from './SignUp';
import SignIn from './SignIn';

const Login = () => {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.imgBackground}></div>
        <div className={styles.container}>
          <div className={styles.branding}>
            <Image src={'/logo.webp'} alt={'logo'} height={260} width={260} />
            <h1 className={styles.title}>
              Les Gazouillis{<br />} du {<br />}Royaume
            </h1>
          </div>
          <div className={styles.btnContainer}>
            <h2>Inscrivez vostre blason ici</h2>

            <SignUp />
            <h4>Etois desja mensbre ?</h4>

            <SignIn />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
