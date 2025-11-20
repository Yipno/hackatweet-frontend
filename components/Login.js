import styles from '../styles/Login.module.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Login = () => {
  return (
    <div className={styles.btnContainer}>
      <h2>Join today</h2>

      <SignUp />
      <h4>Already have an account ?</h4>

      <SignIn />
    </div>
  );
};

export default Login;
