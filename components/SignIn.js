import styles from '../styles/SignIn.module.css';
import { useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // LOGIQUE MODAL
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  // LOGIQUE METIER
  const handleSignIn = async (username, password) => {
    console.log(username, password);
    const response = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!data.result) {
      alert('Vostre blason estois nul connu en ces lieues');
      return;
    } else {
      dispatch(login({ username, token: data.token }));
    }
    setPassword('');
    setUsername('');
    console.log(data);
  };

  return (
    <div>
      <button className={styles.btnSignIn} onClick={showModal}>
        Connectaille
      </button>

      <Modal
        title='Connectaille'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        Escription d'identité
        <input
          type='text'
          id='username'
          placeholder='Surnom de Cour'
          required
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          id='password'
          placeholder='Contre-mot secret'
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit' onClick={() => handleSignIn(username, password)}>
          Connoixion
        </button>
      </Modal>
    </div>
  );
};

export default SignIn;
