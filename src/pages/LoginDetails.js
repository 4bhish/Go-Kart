import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LoginDetails.css'


import { LoginProvider } from '../contexts/LoginContext';
import { app } from '../firebaseConfig';
import ProfilePage from '../components/ProfilePage';

function LoginDetails() {
  const auth = getAuth(app);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const { loginStatus, setLoginStatus } = useContext(LoginProvider);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    setLoginStatus(false);
    localStorage.removeItem('user');
  };

  const handleLogin = async () => {
    try {
      const { user: loggedInUser } = await signInWithEmailAndPassword(auth, email, password);

      setUser(loggedInUser);
      setLoginStatus(true);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      navigate(location?.state?.from?.pathname);
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        className: 'product-added-toast',
      });
    }
  };

  const handleCreateAccount = async () => {
    try {
      const { user: createdUser } = await createUserWithEmailAndPassword(auth, email, password);

      if (createdUser.email === email) {
        toast.success('Account Created Successfully, Please Log-In', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
          className: 'product-added-toast',
        });
      }
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        className: 'product-removed-toast',
      });
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setLoginStatus(true);
    }
  }, [setLoginStatus]);

  return (
    <>
      {user ? (
        <ProfilePage user={user} handleLogout={handleLogout} />
      ) : (
        <div className="login-container">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <p>
            Don't have an account? <span onClick={handleCreateAccount}>Create Account</span>
          </p>
        </div>
      )}
    </>
  );
}

export default LoginDetails;
