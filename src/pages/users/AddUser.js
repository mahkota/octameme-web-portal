/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const bcrypt = require('bcryptjs');

export default function AddUser(props) {
  const { handleToast } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [elevation, setElevation] = useState('1');
  const [emailAuth, setEmailAuth] = useState('');
  const [passwordAuth, setPasswordAuth] = useState('');
  const USER_API_URL = 'https://octameme-api.glitch.me/users';

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setElevation(value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'inputName':
        setName(value);
        break;
      case 'inputEmail':
        setEmail(value);
        break;
      case 'inputPass':
        setPassword(value);
        break;
      case 'inputPassConfirm':
        setPasswordConfirm(value);
        break;

      case 'inputEmailAuth':
        setEmailAuth(value);
        break;
      case 'inputPassAuth':
        setPasswordAuth(value);
        break;
      default:
        break;
    }
  };

  const handleFetchPost = (url, submittedData) => {
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
          handleToast(`Submission failed! Info: "${response.error}"`, 'error');
        } else {
          handleToast('Submission success!', 'success');
        }
      })
      .catch((e) =>
        handleToast(`Submission failed! Info: "${e.message}"`, 'error')
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !(
        name !== '' ||
        email !== '' ||
        /\S+@\S+\.\S+/.test(email) ||
        password !== '' ||
        passwordConfirm !== ''
      )
    ) {
      handleToast(
        'Submission failed! Please make sure that you have filled the form correctly.',
        'error'
      );

      return;
    }

    if (password !== passwordConfirm) {
      handleToast(
        'Submission failed! Please make sure that the confirmation password is the same as entered password.',
        'error'
      );

      return;
    }

    const authUrl = `${USER_API_URL}?elevation=0&elevation=1&email=${emailAuth}`;

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
          !bcrypt.compareSync(passwordAuth, response[0].password)
        ) {
          handleToast(`Invalid credentials!`, 'error');
        } else {
          handleFetchPost(USER_API_URL, {
            elevation: parseInt(elevation, 10),
            email,
            name,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(12)),
          });
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
        <h1>Add New User</h1>
        <Link to="/users" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label mb-0">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                defaultValue=""
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label mb-0">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                defaultValue=""
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPass" className="form-label mb-0">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="inputPass"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassConfirm" className="form-label mb-0">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="inputPassConfirm"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputElevation" className="form-label mb-0">
                Elevation
              </label>
              <select
                className="form-select"
                id="inputElevation"
                defaultValue="1"
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="1">Teacher</option>
                <option value="2">Student</option>
              </select>
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
                      id="inputEmailAuth"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="inputPassAuth"
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
