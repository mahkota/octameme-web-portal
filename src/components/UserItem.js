/* eslint-disable react/prop-types */
import React from 'react';

export default function UserItem(props) {
  const { user, index, handleFetchPost } = props;
  let elevation;

  switch (user.elevation) {
    case 0:
      elevation = 'Admin';
      break;
    case 1:
      elevation = 'Teacher';
      break;
    case 2:
      elevation = 'Student';
      break;
    default:
      elevation = 'Other';
      break;
  }

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{user.email}</td>
      <td>{elevation}</td>
      <td>-</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            handleFetchPost(user.id);
          }}
        >
          <span className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
