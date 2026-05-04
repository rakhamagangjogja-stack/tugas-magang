import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, setAuthToken } from '../lib/storage';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/admin';

  if (getAuthToken()) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'rahasia123') {
      setAuthToken('logged-in');
      navigate(from, { replace: true });
      return;
    }
    setError('Masukkan username dan password yang benar.');
  };

  return (
    <div className="page-shell admin-page">
      <div className="auth-card">
        <h2>Login Admin</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button className="button primary" type="submit">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
