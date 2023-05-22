import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CalendarIcon from '../icons/CalendarIcon';
import { auth, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = () => {
  const [user, loading, error] = useAuthState(auth);
  let menu;

    if(user?.email === '' || user?.email === undefined) {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            Zaloguj
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/register" className="nav-link">
            Zarejestuj
          </Link>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item active">
          <Link to="/login" className="nav-link" onClick={logout}>
            Wyloguj
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-company-red mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-3">
          <CalendarIcon />
          Mój Planner
        </Link>
        <div>{menu}</div>
      </div>
    </nav>
  );
};

export default Nav;
