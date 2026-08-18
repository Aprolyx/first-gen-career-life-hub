import { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
const [loggedInUserId, setLoggedInUserId] = useState('');
function handleLogout() {
  setLoggedInUser('');
  setLoggedInUserId('');
  setUsername('');
  setPassword('');
  setMessage('');
}

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      setMessage(data.message);

     if (response.ok) {
  setLoggedInUser(data.username);
  setLoggedInUserId(data.userId);
}

    } catch (error) {
      setMessage('Unable to connect to the server.');
    }
  }

  return (
    <div className="App">

      <header>
        <h1>First-Gen Career & Life Hub</h1>
        <p>
          You may be the first, but you do not have to figure it out alone.
        </p>
      </header>

      <main>

        {loggedInUser ? (
         <Dashboard
  username={loggedInUser}
  userId={loggedInUserId}
  handleLogout={handleLogout}
/>
        ) : (
          <section className="auth-section">

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

              <label htmlFor="username">
                Username
              </label>

              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

              <label htmlFor="password">
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button type="submit">
                Login
              </button>

            </form>

            {message && <p>{message}</p>}

            <Register />

          </section>
        )}

      </main>

    </div>
  );
}

export default App;