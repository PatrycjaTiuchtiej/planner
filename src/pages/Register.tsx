import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from "../firebase";


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    registerWithEmailAndPassword(name, email, password);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Zarejestruj się</h1>

        <input
          className="form-control"
          placeholder="Nazwa"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Hasło"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Zapisz
        </button>
      </form>
    </main>
  );
};

export default Register;
