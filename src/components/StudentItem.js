/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

export default function StudentItem(props) {
  const { student, index, handleFetchDelete } = props;
  const createdAtFormatted = moment(student.createdAt).format('LLLL');

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{student.user.name}</td>
      <td>{student.user.email}</td>
      <td>{createdAtFormatted}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            handleFetchDelete(student);
          }}
        >
          <span className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
