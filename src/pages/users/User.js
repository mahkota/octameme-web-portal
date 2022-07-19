import React from 'react';
import UsersTableWrapper from '../../components/UsersTableWrapper';

export default function User() {
  return (
    <>
      <div className="px-0 py-5">
        <h1>User Management</h1>
        <button type="button" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </button>
      </div>
      <div>
        <UsersTableWrapper />
      </div>
    </>
  );
}
