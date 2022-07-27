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

  const [getMemeError, getMemeLoading, getMemeData] = useFetchGet(MEME_API_URL);

  useEffect(() => {
    if (!getMemeError && !getMemeLoading) {
      setMemes(getMemeData);
    }

    if (getMemeError) {
      handleToast(`Failed to fetch users! Info: "${getMemeError}"`, 'error');
    }
  }, [getMemeError, getMemeLoading, getMemeData]);

  return (
    <>
      <div className="px-0 py-5">
        {console.log(memes)}
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
          handleFetchDelete={null}
        />
      </div>
    </>
  );
}
