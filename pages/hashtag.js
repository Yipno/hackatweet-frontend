import Hashtag from '../components/Hashtag';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const HashtagPage = () => {
  const router = useRouter();
  const user = useSelector(state => state.user.value);
  useEffect(() => {
    if (!user.token) {
      router.push('/login');
    }
  }, [user]);

  return (
    <>
      <Hashtag />
    </>
  );
};

export default HashtagPage;
