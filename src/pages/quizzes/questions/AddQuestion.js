/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

const bcrypt = require('bcryptjs');

export default function AddQuestion(props) {
  const { handleToast } = props;
  const { quizId } = useParams();

  const QUESTION_API_URL = 'https://octameme-api.glitch.me/questions';
  const [questionDetail, setQuestionDetail] = useState('');
  const [answerDetail, setAnswerDetail] = useState('');
  const [correctAnswerOption, setCorrectAnswerOption] = useState('x');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');

  const USER_API_URL =
    'https://octameme-api.glitch.me/users?elevation=0&elevation=1';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'inputQuestionDetail':
        setQuestionDetail(value);
        break;
      case 'inputAnswerDetail':
        setAnswerDetail(value);
        break;
      case 'inputOptionA':
        setOptionA(value);
        break;
      case 'inputOptionB':
        setOptionB(value);
        break;
      case 'inputOptionC':
        setOptionC(value);
        break;
      case 'inputOptionD':
        setOptionD(value);
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
      case 'inputCorrectAnswerOption':
        setCorrectAnswerOption(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      questionDetail === '' ||
      answerDetail === '' ||
      correctAnswerOption === 'x' ||
      optionA === '' ||
      optionB === '' ||
      optionC === '' ||
      optionD === ''
    ) {
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
            QUESTION_API_URL,
            {
              answerDetail,
              correctAnswerOption,
              createdAt: new Date().toJSON(),
              createdBy: response[0].name,
              optionA,
              optionB,
              optionC,
              optionD,
              questionDetail,
              quizId,
            },
            'Question submission'
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
        <h1>Add New Question</h1>
        <Link
          to={`/questions/${quizId}`}
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
              <label htmlFor="inputQuestionDetail" className="form-label mb-0">
                Question Detail
              </label>
              <textarea
                className="form-control"
                id="inputQuestionDetail"
                defaultValue=""
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputOptionA" className="form-label mb-0">
                Option A
              </label>
              <input
                type="text"
                className="form-control"
                id="inputOptionA"
                defaultValue=""
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputOptionB" className="form-label mb-0">
                Option B
              </label>
              <input
                type="text"
                className="form-control"
                id="inputOptionB"
                defaultValue=""
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputOptionC" className="form-label mb-0">
                Option C
              </label>
              <input
                type="text"
                className="form-control"
                id="inputOptionC"
                defaultValue=""
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputOptionD" className="form-label mb-0">
                Option D
              </label>
              <input
                type="text"
                className="form-control"
                id="inputOptionD"
                defaultValue=""
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputCorrectAnswerOption"
                className="form-label mb-0"
              >
                Correct Answer
              </label>
              <select
                className="form-select"
                id="inputCorrectAnswerOption"
                defaultValue={correctAnswerOption}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="x" disabled>
                  Select
                </option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputAnswerDetail" className="form-label mb-0">
                Answer Detail
              </label>
              <textarea
                className="form-control"
                id="inputAnswerDetail"
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
