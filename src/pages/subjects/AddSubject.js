/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const bcrypt = require('bcryptjs');

export default function AddSubject(props) {
  const { handleToast } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const USER_API_URL =
    'https://octameme-api.glitch.me/users?elevation=0&elevation=1';
  const SUBJECT_API_URL = 'https://octameme-api.glitch.me/subjects';

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'inputTitle':
        setTitle(value);
        break;
      case 'inputDesc':
        setDescription(value);
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

    if (!(title !== '' || description !== '')) {
      handleToast(
        'Submission failed! Please make sure that you have filled the form correctly.',
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
          handleFetchPost(SUBJECT_API_URL, {
            createdAt: new Date().toJSON(),
            createdBy: response[0].name,
            description,
            title,
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
        <h1>Add New Subject</h1>
        <Link to="/subjects" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputTitle" className="form-label mb-0">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                defaultValue=""
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDesc" className="form-label mb-0">
                Description
              </label>
              <textarea
                className="form-control"
                id="inputDesc"
                defaultValue=""
                onChange={handleInputChange}
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
