/* eslint-disable react/prop-types */
import React from 'react';
import UserItem from './UserItem';

export default function UsersTableWrapper(props) {
  const { users, getUserLoading, handleFetchDelete } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Elevation</th>
          {/* <th scope="col">Line ID</th> */}
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {users.map((user, index) => (
          <UserItem
            user={user}
            index={index}
            handleFetchDelete={handleFetchDelete}
          />
        ))}
        {getUserLoading ? (
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
