/* eslint-disable react/prop-types */
import React from 'react';
import TeacherItem from './TeacherItem';

export default function TeachersTableWrapper(props) {
  const { teachers, getTeacherLoading, handleFetchDelete } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Registered At</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {teachers.map((teacher, index) => (
          <TeacherItem
            teacher={teacher}
            index={index}
            handleFetchDelete={handleFetchDelete}
          />
        ))}
        {getTeacherLoading ? (
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
