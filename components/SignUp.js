import { useState } from 'react';
import styles from '../styles/SignUp.module.css';

import { Modal } from 'antd';

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // LOGIQUE MODAL
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

  // LOGIQUE METIER
  const handleSignUp = async (firstname, username, password) => {
    console.log(firstname, username, password);
    const response = await fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, username, password }),
    });
    const data = await response.json();
    setFirstname('');
    setUsername('');
    setPassword('');

    console.log(data);
  };

  return (
    <div>
      <button className={styles.btnSignUp} onClick={showModal}>
        Inscription
      </button>
      <Modal
        title='Title'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{modalText}</p>
        SignUp
        <input
          type='text'
          id='name'
          placeholder='Firstname'
          required
          onChange={e => setFirstname(e.target.value)}
          value={firstname}
        />
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
        <button type='submit' onClick={() => handleSignUp(firstname, username, password)}>
          Register
        </button>
      </Modal>
    </div>
  );
};

export default SignUp;
