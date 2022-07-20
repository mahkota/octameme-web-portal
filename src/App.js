import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import User from './pages/users/User';
import AddUser from './pages/users/AddUser';
import Meme from './pages/memes/Meme';
import AddMeme from './pages/memes/AddMeme';
import Template from './pages/memes/Template';
import AddTemplate from './pages/memes/AddTemplate';
import Subject from './pages/subjects/Subject';
import Quiz from './pages/quizzes/Quiz';

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
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
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
                      <Link className="dropdown-item" to="/users">
                        Users List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/users/add">
                        Create User
                      </Link>
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
                      <Link className="dropdown-item" to="/memes">
                        Memes List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/memes/add">
                        Create Meme
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/templates">
                        Templates List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/templates/add">
                        Create Template
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/subjects">
                    Subjects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/quizzes">
                    Quizzes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
        <Outlet />
      </div>
    </>
  );
}

function App() {
  const handleToast = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    }
    if (type === 'error') {
      toast.error(message);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<User handleToast={handleToast} />} />
        <Route
          path="/users/add"
          element={<AddUser handleToast={handleToast} />}
        />

        <Route path="/memes" element={<Meme />} />
        <Route path="/memes/add" element={<AddMeme />} />

        <Route path="/templates" element={<Template />} />
        <Route path="/templates/add" element={<AddTemplate />} />

        <Route path="/subjects" element={<Subject />} />

        <Route path="/quizzes" element={<Quiz />} />
      </Route>
    </Routes>
  );
}

export default App;
