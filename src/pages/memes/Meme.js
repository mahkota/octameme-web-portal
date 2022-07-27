/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MemesTableWrapper from '../../components/MemesTableWrapper';
import useFetchGet from '../../hooks/useFetchGet';

export default function Meme(props) {
  const { handleToast } = props;

  const [memes, setMemes] = useState([]);
  const MEME_API_URL =
    'https://octameme-api.glitch.me/memes?_expand=subject&_expand=image';
  const DELETE_MEME_API_URL = 'https://octameme-api.glitch.me/memes';

  const [getMemeError, getMemeLoading, getMemeData] = useFetchGet(MEME_API_URL);

  useEffect(() => {
    if (!getMemeError && !getMemeLoading) {
      setMemes(getMemeData);
    }

    if (getMemeError) {
      handleToast(`Failed to fetch memes! Info: "${getMemeError}"`, 'error');
    }
  }, [getMemeError, getMemeLoading, getMemeData]);

  const handleFetchDelete = (meme) => {
    fetch(`${DELETE_MEME_API_URL}/${meme.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          handleToast(
            `Deletion of ${meme.title} failed! Info: "${response.error}"`,
            'error'
          );
        } else {
          handleToast(`Deleted ${meme.title}!`, 'success');
          setMemes(memes.filter((m) => m.id !== meme.id));
        }
      })
      .catch((e) =>
        handleToast(
          `Deletion of ${meme.title} failed! Info: "${e.message}"`,
          'error'
        )
      );
  };

  return (
    <>
      <div className="px-0 py-5">
        <h1>Memes</h1>
        <Link to="/memes/add" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </Link>
      </div>
      <div>
        <MemesTableWrapper
          memes={memes}
          getMemeLoading={getMemeLoading}
          handleFetchDelete={handleFetchDelete}
        />
      </div>
    </>
  );
}
