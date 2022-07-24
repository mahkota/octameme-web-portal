/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UsersTableWrapper from '../../components/UsersTableWrapper';
import useFetchGet from '../../hooks/useFetchGet';

export default function User(props) {
  const { handleToast } = props;

  const [users, setUsers] = useState([]);
  const USER_API_URL = 'https://octameme-api.glitch.me/users';

  const [getUserError, getUserLoading, getUserData] = useFetchGet(USER_API_URL);

  useEffect(() => {
    if (!getUserError && !getUserLoading) {
      setUsers(getUserData);
    }

    if (getUserError) {
      handleToast(`Failed to fetch users! Info: "${getUserError}"`, 'error');
    }
  }, [getUserError, getUserLoading, getUserData]);

  const handleFetchDelete = (user) => {
    fetch(`${USER_API_URL}/${user.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          handleToast(
            `Deletion of ${user.email} failed! Info: "${response.error}"`,
            'error'
          );
        } else {
          handleToast(`Deleted ${user.email}!`, 'success');
          setUsers(users.filter((u) => u.id !== user.id));
        }
      })
      .catch((e) =>
        handleToast(
          `Deletion of ${user.email} failed! Info: "${e.message}"`,
          'error'
        )
      );
  };

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
        <UsersTableWrapper
          users={users}
          getUserLoading={getUserLoading}
          handleFetchDelete={handleFetchDelete}
        />
      </div>
    </>
  );
}
