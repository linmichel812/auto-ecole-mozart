import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Input } from '../../design-system';
import { ASSETS } from '../../data';
import { DEMO_ADMIN_CREDENTIALS } from '../api/adminService';
import { useAdminAuth } from '../context/AdminAuthProvider';
import '../styles/admin.css';

export function AdminLoginPage() {
  const { login, error, clearError, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/espace-admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    try {
      await login({ email, password, remember });
      navigate(from, { replace: true });
    } catch { /* handled */ } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <Link to="/"><img src={ASSETS.logo} alt="Mozart" style={{ display: 'block', margin: '0 auto 1.5rem', height: 48 }} /></Link>
        <h1 className="admin-login__title">Administration</h1>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Espace réservé à l&apos;équipe Mozart
        </p>
        {error && <div className="admin-login__error" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          <Checkbox label="Rester connecté" checked={remember} onChange={setRemember} />
          <Button type="submit" fullWidth disabled={submitting || isLoading} style={{ marginTop: '1rem' }}>
            {submitting ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>
        <p style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: '#64748b', lineHeight: 1.6 }}>
          Démo : <code>{DEMO_ADMIN_CREDENTIALS.email}</code> / <code>{DEMO_ADMIN_CREDENTIALS.password}</code>
        </p>
      </div>
    </div>
  );
}
