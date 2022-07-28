/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

export default function MemeItem(props) {
  const { meme, index, handleFetchDelete } = props;
  const sendAtFormatted = moment(meme.sendAt).format('LLLL');
  const createdAtFormatted = moment(meme.createdAt).format('LLLL');
  const isSentFormatted = meme.isSent ? 'Yes' : 'No';

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{meme.title}</td>
      <td>{meme.description}</td>
      <td>
        <a href={meme.image.url} target="_blank" rel="noreferrer">
          <img
            src={meme.image.url}
            width="200"
            alt={meme.title}
            style={{ border: '1px solid #555' }}
          />
        </a>
      </td>
      <td>
        <a href={meme.referenceLink} target="_blank" rel="noreferrer">
          {meme.referenceLink}
        </a>
      </td>
      <td>{meme.subject.title}</td>
      <td>{isSentFormatted}</td>
      <td>{sendAtFormatted}</td>
      <td>{createdAtFormatted}</td>
      <td>{meme.createdBy}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            handleFetchDelete(meme);
          }}
        >
          <span className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
