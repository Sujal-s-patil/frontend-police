import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [Police_id, setPolice_id] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      Police_id: Police_id,
      password: password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/police/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        sessionStorage.setItem('userData', JSON.stringify(data[0]));
        navigate('/dashboard');
      } else {
        setErrorMessage(data.message || 'Login failed');
        setPassword(''); // Clear the password field for security
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred while trying to log in.');
      setPassword(''); // Clear the password field for security
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} autoComplete="off">
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={Police_id}
            onChange={(e) => setPolice_id(e.target.value)}
            placeholder="Police ID"
            autoComplete="off"
            maxLength="12" 
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>
        )}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            marginBottom: '15px',
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/register')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28A745',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
