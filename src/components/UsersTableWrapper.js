import React from 'react';
import UserItem from './UserItem';

export default function UsersTableWrapper() {
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Elevation</th>
          <th scope="col">Line ID</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        <tr>
          <th scope="row">1</th>
          <td>fach.mkt@gmail.com</td>
          <td>Admin</td>
          <td>-</td>
          <td>
            <button type="button" className="btn btn-sm btn-danger">
              <span className="fa-solid fa-trash" aria-hidden="true" />
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>johndoe@mail.com</td>
          <td>Teacher</td>
          <td>-</td>
          <td>
            <button type="button" className="btn btn-sm btn-danger">
              <span className="fa-solid fa-trash" aria-hidden="true" />
            </button>
          </td>
        </tr>
        <UserItem />
      </tbody>
    </table>
  );
}
