/* eslint-disable react/prop-types */
import React from 'react';
import SubjectItem from './SubjectItem';

export default function SubjectsTableWrapper(props) {
  const { subjects, getSubjectLoading } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Created At</th>
          <th scope="col">Created By</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {subjects.map((subject, index) => (
          <SubjectItem subject={subject} index={index + 1} />
        ))}
        {getSubjectLoading ? (
          <tr>
            <td colSpan="6">
              <i>Loading...</i>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
