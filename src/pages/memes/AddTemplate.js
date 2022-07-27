/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const bcrypt = require('bcryptjs');

export default function AddTemplate(props) {
  const { handleToast } = props;

  const TEMPLATE_API_URL = 'https://octameme-api.glitch.me/templates';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [templateImage, setTemplateImage] = useState(null);
  const [templateImageUrl, setTemplateImageUrl] = useState('');
  const [exampleImage, setExampleImage] = useState(null);
  const [exampleImageUrl, setExampleImageUrl] = useState('');

  const USER_API_URL =
    'https://octameme-api.glitch.me/users?elevation=0&elevation=1';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleFileChange = (e) => {
    const { id, files } = e.target;

    switch (id) {
      case 'inputTemplateImage':
        setTemplateImage(files[0]);
        break;
      case 'inputExampleImage':
        setExampleImage(files[0]);
        break;
      default:
        break;
    }
  };

  const handleFileUpload = async (image, context) => {
    const body = new FormData();
    body.set('key', '32ccaf8fc011097a556cd9d12c0bcdbd');
    body.append('image', image);

    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    })
      .then((res) => {
        switch (context) {
          case 'Template':
            setTemplateImageUrl(res.data.data.image.url);
            break;
          case 'Example':
            setExampleImageUrl(res.data.data.image.url);
            break;
          default:
            break;
        }
        handleToast(
          `${context} image upload success! You may continue to fill or submit form.`,
          'success'
        );
      })
      .catch((err) =>
        handleToast(
          `${context} image upload failed! Info: "${err.message}"`,
          'error'
        )
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      title === '' ||
      description === '' ||
      templateImageUrl === '' ||
      exampleImageUrl === ''
    ) {
      handleToast(
        'Submission failed! Please make sure that you have uploaded the images and filled the form correctly.',
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
            TEMPLATE_API_URL,
            {
              createdAt: new Date().toJSON(),
              createdBy: response[0].name,
              description,
              exampleImageUrl,
              templateImageUrl,
              title,
            },
            'Template submission'
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
        <h1>Add New Meme Template</h1>
        <Link to="/templates" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
      </div>
      <div className="card mb-5">
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
                defaultValue={title}
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
                defaultValue={description}
                onChange={handleInputChange}
              />
            </div>
            <label htmlFor="inputTemplateImage" className="form-label mb-0">
              Template Image
            </label>
            <div className="input-group mb-3" id="inputImage">
              <input
                className="form-control"
                type="file"
                id="inputTemplateImage"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                disabled={templateImageUrl !== ''}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => handleFileUpload(templateImage, 'Template')}
                disabled={templateImageUrl !== ''}
              >
                <i className="fa-solid fa-upload" />
                <span className="ms-2">Upload</span>
              </button>
            </div>
            <label htmlFor="inputExampleImage" className="form-label mb-0">
              Example Image
            </label>
            <div className="input-group mb-3" id="inputImage">
              <input
                className="form-control"
                type="file"
                id="inputExampleImage"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                disabled={exampleImageUrl !== ''}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => handleFileUpload(exampleImage, 'Example')}
                disabled={exampleImageUrl !== ''}
              >
                <i className="fa-solid fa-upload" />
                <span className="ms-2">Upload</span>
              </button>
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
