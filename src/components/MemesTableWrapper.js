/* eslint-disable react/prop-types */
import React from 'react';
import MemeItem from './MemeItem';

export default function MemesTableWrapper(props) {
  const { memes, getMemeLoading, handleFetchDelete } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Image</th>
          <th scope="col">Reference</th>
          <th scope="col">Subject</th>
          <th scope="col">Is Sent</th>
          <th scope="col">Send At</th>
          <th scope="col">Created At</th>
          <th scope="col">Created By</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {memes.map((meme, index) => (
          <MemeItem
            meme={meme}
            index={index}
            handleFetchDelete={handleFetchDelete}
          />
        ))}
        {getMemeLoading ? (
          <tr>
            <td colSpan="11">
              <i>Loading...</i>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
