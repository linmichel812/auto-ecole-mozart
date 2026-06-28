import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Input } from '../../design-system';
import { ASSETS } from '../../data';
import { DEMO_CREDENTIALS } from '../api/studentService';
import { useAuth } from '../context/AuthProvider';
import '../styles/student.css';

export function LoginPage() {
  const { login, error, clearError, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/espace-eleve';

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
    } catch {
      /* error in context */
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  return (
    <div className="student-login">
      <div className="student-login__card">
        <Link to="/">
          <img src={ASSETS.logo} alt="Auto-École Mozart" className="student-login__logo" />
        </Link>
        <h1 className="student-login__title">Espace élève</h1>
        <p className="student-login__subtitle">Connectez-vous pour suivre votre formation</p>

        {error && <div className="student-login__error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="votre@email.cm"
          />
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="••••••••"
          />
          <Checkbox
            label="Rester connecté"
            checked={remember}
            onChange={setRemember}
          />
          <Button type="submit" fullWidth disabled={submitting || isLoading} style={{ marginTop: '1rem' }}>
            {submitting ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>

        <div className="student-login__demo">
          <strong>Compte démo :</strong><br />
          Email : <code>{DEMO_CREDENTIALS.email}</code><br />
          Mot de passe : <code>{DEMO_CREDENTIALS.password}</code><br />
          <Button variant="outline" size="sm" fullWidth onClick={fillDemo} style={{ marginTop: '0.75rem' }}>
            Remplir les identifiants démo
          </Button>
        </div>
      </div>
    </div>
  );
}
