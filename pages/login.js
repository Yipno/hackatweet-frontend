import Login from '../components/Login';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const router = useRouter();
  const user = useSelector(state => state.user.value);
  useEffect(() => {
    if (user.token) {
      router.push('/');
    }
  }, [user]);
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
