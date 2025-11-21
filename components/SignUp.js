import { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

const SignUp = () => {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // LOGIQUE MODAL
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
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

  const modalContent = (
    <div className={styles.modal}>
      <h3>SignUp</h3>
      <input
        type='text'
        id='name'
        placeholder='Appelation Première'
        required
        onChange={e => setFirstname(e.target.value)}
        value={firstname}
      />
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
        placeholder='Contre-mot Secret'
        required
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button type='submit' onClick={() => handleSignUp(firstname, username, password)}>
        Se mettre en les tablettes du Roy
      </button>
    </div>
  );

  // LOGIQUE METIER
  const handleSignUp = async (firstname, username, password) => {
    console.log(firstname, username, password);
    const response = await fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, username, password }),
    });
    const data = await response.json();
    if (!data.result) {
      alert('Ce gueux estois desja dans les registres');
      return;
    } else {
      dispatch(login({ username, token: data.token }));
      setOpen(false);
    }
    setFirstname('');
    setUsername('');
    setPassword('');

    console.log(data);
  };

  return (
    <div>
      <button className={styles.btnSignUp} onClick={showModal}>
        Registement
      </button>
      <Modal
        styles={{
          content: {
            backgroundColor: '#E5D3A1',
          },
          header: {
            backgroundColor: '#E5D3A1',
          },
          footer: {
            display: 'none',
          },
        }}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default SignUp;
