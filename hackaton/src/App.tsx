import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleRegister = (event) => {
    event.preventDefault();

    if (email === '' || createPassword === '') {
      setMessage('Veuillez entrer à la fois un e-mail et un mot de passe.');
      return;
    }

    const newUser = {
      email,
      password: createPassword
    };

    // Sauvegarder l'utilisateur dans le localStorage
    localStorage.setItem('user_' + email, JSON.stringify(newUser));
    setMessage('Utilisateur créé avec succès !');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (loginEmail === '' || loginPassword === '') {
      setErrorMessage('Veuillez entrer à la fois un e-mail et un mot de passe.');
      return;
    }

    // Récupérer l'utilisateur du localStorage
    const storedUser = JSON.parse(localStorage.getItem('user_' + loginEmail));

    if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
      // Connexion réussie
      alert('Connexion réussie!');
    } else {
      setErrorMessage('E-mail ou mot de passe invalide.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setMessage('');
  };

  return (
    <div className='App'>
      <div className='Formulaires'>
      {isLogin ? (
        <>
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit}>
            <label>
              E-mail :
              <input type='email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </label>
            <br />
            <label>
              Mot de passe :
              <input type='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </label>
            <br />
            <button type='submit'>Connexion</button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
          <p>
            Pas encore de compte? <button onClick={toggleForm}>Créez-en un</button>
          </p>
        </>
      ) : (
        <>
          <h1>Inscription</h1>
          <form onSubmit={handleRegister}>
            <label>
              E-mail :
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
              Mot de passe :
              <input type='password' value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
            </label>
            <br />
            <button type='submit'>Inscription</button>
            {message && <p>{message}</p>}
          </form>
          <p>
            Déjà un compte? <button onClick={toggleForm}>Connectez-vous</button>
          </p>
        </>
      )}
      </div>
    </div>
  );
}

export default App;



