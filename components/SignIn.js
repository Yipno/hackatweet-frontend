import styles from '../styles/SignIn.module.css';
import { useState } from 'react';
import { Modal } from 'antd';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

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

  const handleSignIn = async (username, password) => {
    console.log(username, password);
    const response = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setPassword('');
    setUsername('');
    console.log(data);
  };

  return (
    <div>
      <button className={styles.btnSignIn} onClick={showModal}>
        Connexion
      </button>

      <Modal
        title='Title'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{modalText}</p>
        SignIn
        <input
          type='text'
          id='username'
          placeholder='Username'
          required
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit' onClick={() => handleSignIn(username, password)}>
          Login
        </button>
      </Modal>
    </div>
  );
};

export default SignIn;
