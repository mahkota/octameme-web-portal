/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFetchGet from '../../hooks/useFetchGet';

const bcrypt = require('bcryptjs');

export default function AddMeme(props) {
  const { handleToast } = props;

  const MEME_API_URL = 'https://octameme-api.glitch.me/memes';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState(-1);
  const [sendTime, setSendTime] = useState(new Date());

  const USER_API_URL =
    'https://octameme-api.glitch.me/users?elevation=0&elevation=1';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SUBJECT_API_URL = 'https://octameme-api.glitch.me/subjects';
  const [subjects, setSubjects] = useState([]);

  const IMAGE_API_URL = 'https://octameme-api.glitch.me/images';
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageId, setImageId] = useState(-1);

  const [getSubjectError, getSubjectLoading, getSubjectData] =
    useFetchGet(SUBJECT_API_URL);

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
          let extraMsg = '';
          if (context === 'Image upload') {
            setImageId(response.id);
            extraMsg = ' You may continue to fill or submit form.';
          }
          handleToast(`${context} success!${extraMsg}`, 'success');
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

    if (imageUrl !== '') {
      handleFetchPost(
        IMAGE_API_URL,
        {
          createdAt: new Date().toJSON(),
          url: imageUrl,
        },
        'Image upload'
      );
    }
  }, [getSubjectError, getSubjectLoading, getSubjectData, imageUrl]);

  const handleFileChange = (e) => {
    const { files } = e.target;
    setImage(files[0]);
  };

  const handleFileUpload = async () => {
    const body = new FormData();
    body.set('key', '32ccaf8fc011097a556cd9d12c0bcdbd');
    body.append('image', image);

    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    })
      .then((res) => {
        setImageUrl(res.data.data.image.url);
      })
      .catch((err) =>
        handleToast(`Image upload failed! Info: "${err.message}"`, 'error')
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      subjectId === -1 ||
      title === '' ||
      description === '' ||
      imageId === -1
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
            MEME_API_URL,
            {
              createdAt: new Date().toJSON(),
              createdBy: response[0].name,
              description,
              imageId,
              isSent: false,
              sendAt: sendTime.toJSON(),
              subjectId,
              updatedAt: '',
              updatedBy: '',
              title,
            },
            'Meme submission'
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
      {console.log(imageUrl)}
      {console.log(imageId)}
      <div className="px-0 py-5">
        <h1>Add New Meme</h1>
        <Link to="/memes" className="btn btn-sm btn-outline-primary">
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
              >
                <option value="-1" disabled>
                  Select
                </option>
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
            <label htmlFor="inputImage" className="form-label mb-0">
              Image
            </label>
            <div className="input-group mb-3" id="inputImage">
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                disabled={imageId !== -1}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleFileUpload}
                disabled={imageId !== -1}
              >
                <i className="fa-solid fa-upload" />
                <span className="ms-2">Upload</span>
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="inputSendAt" className="form-label mb-0">
                Send At
              </label>
              <DatePicker
                id="inputSendAt"
                selected={sendTime}
                onChange={(date) => setSendTime(date)}
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
