import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (username.trim() === '') {
      newErrors.username = 'Username is required.';
    }

    if (password.length < 8 || !/\d/.test(password)) {
      newErrors.password =
        'Password must be at least 8 characters long and contain a number.';
    }

    if (password !== repeatPassword) {
      newErrors.repeatPassword = 'The two passwords do not match.';
    }

    if (!agreedToTerms) {
      newErrors.terms =
        'You must agree to the Terms and Conditions and Privacy Policy.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
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

    } catch (error) {
      setMessage('Unable to connect to the server.');
    }
  }

  return (
    <div className="register-section">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <label htmlFor="registerUsername">
          Username
        </label>

        <input
          type="text"
          id="registerUsername"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);

            setErrors({
              ...errors,
              username: ''
            });
          }}
        />

        {errors.username && <p>{errors.username}</p>}

        <label htmlFor="registerPassword">
          Password
        </label>

        <input
          type="password"
          id="registerPassword"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);

            setErrors({
              ...errors,
              password: ''
            });
          }}
        />

        {errors.password && <p>{errors.password}</p>}

        <label htmlFor="repeatPassword">
          Repeat Password
        </label>

        <input
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(event) => {
            setRepeatPassword(event.target.value);

            setErrors({
              ...errors,
              repeatPassword: ''
            });
          }}
        />

        {errors.repeatPassword && <p>{errors.repeatPassword}</p>}

        <label>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(event) => {
              setAgreedToTerms(event.target.checked);

              setErrors({
                ...errors,
                terms: ''
              });
            }}
          />

          I agree to the Terms and Conditions and Privacy Policy
        </label>

        {errors.terms && <p>{errors.terms}</p>}

        <button type="submit">
          Register
        </button>

      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;