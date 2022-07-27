/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchGet from '../../hooks/useFetchGet';

export default function AddMeme(props) {
  const { handleToast } = props;

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  // const [imageId, setImageId] = useState(-1);
  // const [subjectId, setSubjectId] = useState(-1);
  // const [sendTime, setSendTime] = useState(-1);
  const [image, setImage] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const SUBJECT_API_URL = 'https://octameme-api.glitch.me/subjects';
  // const IMAGE_API_URL = 'https://octameme-api.glitch.me/images';

  const [getSubjectError, getSubjectLoading, getSubjectData] =
    useFetchGet(SUBJECT_API_URL);

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

  const handleFileChange = (e) => {
    const { files } = e.target;
    setImage(files[0]);
  };

  // const handleFetchPost = (url, submittedData) => {
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(submittedData),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response.error) {
  //         handleToast(`Submission failed! Info: "${response.error}"`, 'error');
  //       } else {
  //         handleToast('Submission success!', 'success');
  //       }
  //     })
  //     .catch((e) =>
  //       handleToast(`Submission failed! Info: "${e.message}"`, 'error')
  //     );
  // };

  const handleFileUpload = () => {
    fetch(
      `https://api.imgbb.com/1/upload?key=32ccaf8fc011097a556cd9d12c0bcdbd`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          image,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          handleToast(
            `Image upload failed! Info: "${response.error}"`,
            'error'
          );
        } else {
          handleToast('Image upload success!', 'success');
          // handleFetchPost(IMAGE_API_URL, {
          //   url: response.
          // })
          console.log(response);
        }
      })
      .catch((e) =>
        handleToast(`Image upload failed! Info: "${e.message}"`, 'error')
      );
  };

  return (
    <>
      {console.log(subjects)}
      {console.log(image)}
      <div className="px-0 py-5">
        <h1>Add New Meme</h1>
        <Link to="/memes" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <form
            method="post"
            // onSubmit={handleSubmit}
          >
            {/* <div className="mb-3">
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
            </div> */}
            <div className="mb-3">
              <label htmlFor="inputElevation" className="form-label mb-0">
                Subjects
              </label>
              <select
                className="form-select"
                id="inputElevation"
                defaultValue="1"
                onChange={(e) => console.log(e)}
              >
                <option value="-1">Select</option>
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
                defaultValue=""
                // onChange={handleInputChange}
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
                // onChange={handleInputChange}
              />
            </div>
            <div className="card mb-3">
              <div className="card-header text-bg-primary">Image Upload</div>
              <div className="card-body text-bg-secondary">
                <h5 className="card-title">Select image file:</h5>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                </div>
                {/* <div className="row mb-3">
                  <div className="col">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Email"
                      id="inputEmailAuth"
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="inputPassAuth"
                      // onChange={handleInputChange}
                    />
                  </div>
                </div> */}
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={handleFileUpload}
                >
                  <i className="fa-solid fa-upload" />
                  <span className="ms-2">Upload</span>
                </button>
              </div>
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
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="inputPassAuth"
                      // onChange={handleInputChange}
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
