/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function SubjectItem(props) {
  const { subject, index, handleFetchDelete } = props;
  const dateTimeFormatted = moment(subject.createdAt).format('LLLL');

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{subject.title}</td>
      <td>{subject.description}</td>
      <td>{dateTimeFormatted}</td>
      <td>{subject.createdBy}</td>
      <td>
        <div className="btn-group" role="group">
          <Link
            to={`/teachers?subjectId=${subject.id}`}
            className="btn btn-sm btn-outline-primary"
          >
            See Teachers
          </Link>
          <Link
            to={`/students?subjectId=${subject.id}`}
            className="btn btn-sm btn-outline-success"
          >
            See Students
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => {
              handleFetchDelete(subject);
            }}
          >
            <span className="fa-solid fa-trash" aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  );
}
