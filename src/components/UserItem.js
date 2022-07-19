import React from 'react';

export default function UserItem() {
  return (
    <tr>
      <th scope="row">3</th>
      <td>janedoe@mail.com</td>
      <td>Student</td>
      <td>janedoeline</td>
      <td>
        <button type="button" className="btn btn-sm btn-danger">
          <span className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
