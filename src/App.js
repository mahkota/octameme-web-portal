import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';

function Navigation() {
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            OctaMeme Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="userMgmtDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    User Management
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="userMgmtDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/">
                        Users List
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Create User
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="memeDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Meme
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="memeDropdown">
                    <li>
                      <a className="dropdown-item" href="/">
                        Memes List
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Create Meme
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Templates
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Create Template
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Subjects
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Quizzes
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
