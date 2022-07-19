import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UsersTableWrapper from '../../components/UsersTableWrapper';
import useFetchGet from '../../hooks/useFetchGet';

export default function User() {
  const [users, setUsers] = useState([]);
  const USER_API_URL = 'https://octameme-api.herokuapp.com/users';

  const [getUserError, getUserLoading, getUserData] = useFetchGet(USER_API_URL);

  useEffect(() => {
    if (!getUserError && !getUserLoading) {
      setUsers(getUserData);
    }
  }, [getUserError, getUserLoading, getUserData]);

  return (
    <>
      <div className="px-0 py-5">
        <h1>User Management</h1>
        <Link to="/users/add" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </Link>
      </div>
      <div>
        <UsersTableWrapper users={users} getUserLoading={getUserLoading} />
      </div>
    </>
  );
}
