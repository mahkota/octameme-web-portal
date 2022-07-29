/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

const bcrypt = require('bcryptjs');

export default function StudentRegistration(props) {
  const { handleToast } = props;

  const [emailAuth, setEmailAuth] = useState('');
  const [passwordAuth, setPasswordAuth] = useState('');
  const USER_API_URL = 'https://octameme-api.glitch.me/users?elevation=2';

  const [student, setStudent] = useState({});
  const [studentFound, setStudentFound] = useState(false);
  const [studentLineId, setStudentLineId] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'inputLineId':
        setStudentLineId(value);
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

  const handleSubmitAuth = async (e) => {
    e.preventDefault();

    const authUrl = `${USER_API_URL}&email=${emailAuth}`;

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
          handleToast(
            'Valid student credentials! Please continue to the next step.',
            'success'
          );
          setStudent(response[0]);
          setStudentFound(true);
        }
      })
      .catch((err) =>
        handleToast(
          `Validating credentials failed! Info: "${err.message}"`,
          'error'
        )
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(studentLineId !== '')) {
      handleToast(
        'Submission failed! Please make sure that you have filled the form correctly.',
        'error'
      );

      return;
    }

    const submissionData = student;
    submissionData.line = studentLineId;

    fetch(`https://octameme-api.glitch.me/users/${submissionData.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          handleToast(`Submission failed! Info: "${response.error}"`, 'error');
        } else {
          handleToast('Submission success!', 'success');
        }
      })
      .catch((err) =>
        handleToast(`Submission failed! Info: "${err.message}"`, 'error')
      );
  };

  return (
    <>
      <div className="px-0 py-5">
        <h1>Student Registration</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <form method="post" onSubmit={handleSubmitAuth}>
            <div className="card mb-3">
              <div className="card-header">First Step</div>
              <div className="card-body">
                <h5 className="card-title">Confirm student credentials</h5>
                <p>Enter the credentials given by your teacher.</p>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Email"
                      id="inputEmailAuth"
                      onChange={handleInputChange}
                      disabled={studentFound}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="inputPassAuth"
                      onChange={handleInputChange}
                      disabled={studentFound}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={studentFound}
                >
                  <i className="fa-solid fa-check" />
                  <span className="ms-2">Confirm</span>
                </button>
              </div>
            </div>
          </form>
          <form method="post" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">Second Step</div>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`${process.env.PUBLIC_URL}/qr.png`}
                    className="img-fluid rounded-start px-4"
                    alt="LINE Chatbot QR Code"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      Add chatbot as friend and get LINE User ID
                    </h5>
                    <div className="card-text mb-0">
                      <ol>
                        <li>
                          Scan the QR code in the left with your LINE
                          application, and send &quot;get id&quot; message to
                          the chatbot.
                        </li>
                        <li>
                          Paste the ID to the text box below and click
                          &apos;Submit&apos;.
                        </li>
                      </ol>
                    </div>
                    <p className="card-text">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="inputLineId"
                          placeholder="LINE User ID"
                          defaultValue=""
                          onChange={handleInputChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        <i className="fa-solid fa-paper-plane" />
                        <span className="ms-2">Submit</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
