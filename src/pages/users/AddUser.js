/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddUser(props) {
  const { handleToast } = props;

  const [email, setEmail] = useState('');
  const [elevation, setElevation] = useState('');
  const USER_API_URL = 'https://octameme-api.herokuapp.com/users';

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setElevation(value);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
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
        }
        handleToast('Submission success!', 'success');
      })
      .catch((e) =>
        handleToast(`Submission failed! Info: "${e.message}"`, 'error')
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submittedData = {
      email,
      elevation: parseInt(elevation, 10),
    };

    if (email !== '' || /\S+@\S+\.\S+/.test(email)) {
      handleFetchPost(USER_API_URL, submittedData);
    } else {
      handleToast(
        'Submission failed! Please make sure that you have filled the form correctly.',
        'error'
      );
    }
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
              <label htmlFor="inputEmail" className="form-label">
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
              <label htmlFor="inputElevation" className="form-label">
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
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-paper-plane" />
              <span className="ms-2">Submit</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
