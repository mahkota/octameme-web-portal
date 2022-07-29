/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFetchGet from '../../hooks/useFetchGet';

const bcrypt = require('bcryptjs');

export default function AddQuiz(props) {
  const { handleToast } = props;

  const QUIZ_API_URL = 'https://octameme-api.glitch.me/quizzes';
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(-1);
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());

  const USER_API_URL =
    'https://octameme-api.glitch.me/users?elevation=0&elevation=1';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SUBJECT_API_URL = 'https://octameme-api.glitch.me/subjects';
  const [subjects, setSubjects] = useState([]);

  const [getSubjectError, getSubjectLoading, getSubjectData] =
    useFetchGet(SUBJECT_API_URL);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'inputTitle':
        setTitle(value);
        break;
      case 'inputEmail':
        setEmail(value);
        break;
      case 'inputPass':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'inputSubject':
        setSubjectId(value);
        break;
      default:
        break;
    }
  };

  const handleFetchPost = async (url, submittedData, context) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submittedData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          handleToast(`${context} failed! Info: "${response.error}"`, 'error');
        } else {
          handleToast(`${context} success!`, 'success');
        }
      })
      .catch((e) =>
        handleToast(`${context} failed! Info: "${e.message}"`, 'error')
      );
  };

  useEffect(() => {
    if (!getSubjectError && !getSubjectLoading) {
      setSubjects(getSubjectData);
    }

    if (getSubjectError) {
      handleToast(
        `Failed to fetch subjects! Info: "${getSubjectError}"`,
        'error'
      );
    }
  }, [getSubjectError, getSubjectLoading, getSubjectData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subjectId === -1 || title === '') {
      handleToast(
        'Submission failed! Please make sure that you have uploaded the image and filled the form correctly.',
        'error'
      );

      return;
    }

    const authUrl = `${USER_API_URL}&email=${email}`;

    fetch(authUrl)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          handleToast(
            `Validating credentials failed! Info: "${response.error}"`,
            'error'
          );
        }
        if (
          response.length === 0 ||
          !bcrypt.compareSync(password, response[0].password)
        ) {
          handleToast(`Invalid credentials!`, 'error');
        } else {
          handleFetchPost(
            QUIZ_API_URL,
            {
              createdAt: new Date().toJSON(),
              createdBy: response[0].name,
              endAt,
              startAt,
              subjectId,
              title,
            },
            'Quiz submission'
          );
        }
      })
      .catch((err) =>
        handleToast(
          `Validating credentials failed! Info: "${err.message}"`,
          'error'
        )
      );
  };

  return (
    <>
      <div className="px-0 py-5">
        <h1>Add New Quiz</h1>
        <Link to="/quizzes" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
      </div>
      <div className="card mb-5">
        <div className="card-body">
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputSubject" className="form-label mb-0">
                Subjects
              </label>
              <select
                className="form-select"
                id="inputSubject"
                defaultValue={subjectId}
                onChange={(e) => handleSelectChange(e)}
                disabled={getSubjectLoading}
              >
                {getSubjectLoading ? (
                  <option value="-1" disabled>
                    Loading...
                  </option>
                ) : (
                  <option value="-1" disabled>
                    Select
                  </option>
                )}
                {/* <option value="-1" disabled>
                  Select
                </option> */}
                {subjects.map((sub) => (
                  <option value={sub.id}>{sub.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputTitle" className="form-label mb-0">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                defaultValue={title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputStartAt" className="form-label mb-0">
                Start At
              </label>
              <DatePicker
                id="inputStartAt"
                selected={startAt}
                onChange={(ds) => setStartAt(ds)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEndAt" className="form-label mb-0">
                End At
              </label>
              <DatePicker
                id="inputEntAt"
                selected={endAt}
                onChange={(de) => setEndAt(de)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            <div className="card">
              <div className="card-header text-bg-danger">
                Authentication Required
              </div>
              <div className="card-body text-bg-secondary">
                <h5 className="card-title">
                  Enter admin or teacher&apos;s credentials:
                </h5>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Email"
                      id="inputEmail"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="inputPass"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-light">
                  <i className="fa-solid fa-paper-plane" />
                  <span className="ms-2">Submit</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
