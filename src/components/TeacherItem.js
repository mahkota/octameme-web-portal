/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

export default function TeacherItem(props) {
  const { teacher, index, handleFetchDelete } = props;
  const createdAtFormatted = moment(teacher.createdAt).format('LLLL');

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{teacher.user.name}</td>
      <td>{teacher.user.email}</td>
      <td>{createdAtFormatted}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            handleFetchDelete(teacher);
          }}
        >
          <span className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
