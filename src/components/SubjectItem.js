/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

export default function SubjectItem(props) {
  const { subject, index } = props;
  const dateTimeFormatted = moment(subject.createdAt).format('LLLL');

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{subject.title}</td>
      <td>{subject.description}</td>
      <td>{dateTimeFormatted}</td>
      <td>{subject.createdBy}</td>
      <td>
        <button type="button" className="btn btn-sm btn-danger">
          <span className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
