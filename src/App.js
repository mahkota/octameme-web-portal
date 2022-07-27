import './App.css';
import { Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
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
import AddSubject from './pages/subjects/AddSubject';
import Score from './pages/quizzes/scores/Score';
import Question from './pages/quizzes/questions/Question';
import AddQuestion from './pages/quizzes/questions/AddQuestion';
import Teacher from './pages/subjects/teachers/Teacher';

function Navigation() {
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OctaMeme Dashboard
          </Link>
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
        <Outlet />
      </div>
    </>
  );
}

function PassiveNavigation() {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container">
        <div className="navbar-brand">OctaMeme Dashboard</div>
      </div>
    </nav>
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

        <Route path="/memes" element={<Meme handleToast={handleToast} />} />
        <Route
          path="/memes/add"
          element={<AddMeme handleToast={handleToast} />}
        />

        <Route
          path="/templates"
          element={<Template handleToast={handleToast} />}
        />
        <Route
          path="/templates/add"
          element={<AddTemplate handleToast={handleToast} />}
        />

        <Route
          path="/subjects"
          element={<Subject handleToast={handleToast} />}
        />
        <Route
          path="/subjects/add"
          element={<AddSubject handleToast={handleToast} />}
        />

        <Route
          path="/teachers/:subjectId"
          element={<Teacher handleToast={handleToast} />}
        />

        <Route path="/quizzes" element={<Quiz />} />

        {/* <Route path="/scores" element={<Score />} /> */}
        <Route path="/scores/:quizId" element={<Score />} />

        <Route path="/questions/:quizId" element={<Question />} />
        <Route
          path="/questions/add/:quizId"
          element={<AddQuestion handleToast={handleToast} />}
        />

        <Route
          path="/answers/:quizId/:userId"
          element={<AnswerPlaceholder />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />

      <Route path="/student-portal" element={<StudentPortalPlaceholder />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <>
      <PassiveNavigation />
      <div className="container">
        <div className="px-0 py-5">
          <h1>Page Not Found</h1>
        </div>
      </div>
    </>
  );
}

function StudentPortalPlaceholder() {
  return (
    <>
      <PassiveNavigation />
      <div className="container">
        <div className="px-0 py-5">
          <h1>Register Student</h1>
        </div>
      </div>
    </>
  );
}

function AnswerPlaceholder() {
  const { quizId, userId } = useParams();

  return (
    <div className="container">
      <div className="px-0 py-5">
        <h1>Answers for Quiz X from Student Y</h1>
        <p>
          Quiz ID: {quizId}, User ID: {userId}
        </p>
      </div>
    </div>
  );
}

export default App;
