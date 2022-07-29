/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFetchGet from '../../../hooks/useFetchGet';

const bcrypt = require('bcryptjs');

export default function AddTeacher(props) {
  const { handleToast } = props;

  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subjectId');

  const TEACHER_API_URL = 'https://octameme-api.glitch.me/teachers';
  const USER_API_URL = 'https://octameme-api.glitch.me/users?elevation=1';
  const USER_AUTH_API_URL = 'https://octameme-api.glitch.me/users?elevation=0';
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [getUserError, getUserLoading, getUserData] = useFetchGet(USER_API_URL);

  const handleSelectChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'inputUser':
        setUserId(value);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
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

  useEffect(() => {
    if (!getUserError && !getUserLoading) {
      setUsers(getUserData);
    }

    if (getUserError) {
      handleToast(`Failed to fetch users! Info: "${getUserError}"`, 'error');
    }
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subjectId === -1 || userId === -1) {
      handleToast(
        'Submission failed! Please make sure that you have uploaded the image and filled the form correctly.',
        'error'
      );

      return;
    }

    const authUrl = `${USER_AUTH_API_URL}&email=${email}`;

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
            TEACHER_API_URL,
            {
              createdAt: new Date().toJSON(),
              subjectId,
              userId,
            },
            'Teacher submission'
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
        <h1>Add New Teacher</h1>
        <Link
          to={`/teachers?subjectId=${subjectId}`}
          className="btn btn-sm btn-outline-primary"
        >
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
      </div>
      <div className="card mb-5">
        <div className="card-body">
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputUser" className="form-label mb-0">
                Teacher
              </label>
              <select
                className="form-select"
                id="inputUser"
                defaultValue={userId}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="-1" disabled>
                  Select
                </option>
                {users.map((u) => (
                  <option value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
            <div className="card">
              <div className="card-header text-bg-danger">
                Authentication Required
              </div>
              <div className="card-body text-bg-secondary">
                <h5 className="card-title">Enter admin credentials:</h5>
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
