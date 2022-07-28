/* eslint-disable react/prop-types */
import React from 'react';
import StudentItem from './StudentItem';

export default function StudentsTableWrapper(props) {
  const { students, getStudentsLoading, handleFetchDelete } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Enrolled At</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {students.map((student, index) => (
          <StudentItem
            student={student}
            index={index}
            handleFetchDelete={handleFetchDelete}
          />
        ))}
        {getStudentsLoading ? (
          <tr>
            <td colSpan="5">
              <i>Loading...</i>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
