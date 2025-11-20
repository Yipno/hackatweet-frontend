import styles from '../styles/Login.module.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Login = () => {
  return (
    <div className={styles.btnContainer}>
      <h2>Inscrivez vostre blason ici</h2>

      <SignUp />
      <h4>Etois desja mensbre ?</h4>

      <SignIn />
    </div>
  );
};

export default Login;
