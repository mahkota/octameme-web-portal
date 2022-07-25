/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubjectsTableWrapper from '../../components/SubjectsTableWrapper';
import useFetchGet from '../../hooks/useFetchGet';

export default function Subject(props) {
  const { handleToast } = props;

  const [subjects, setSubjects] = useState([]);
  const SUBJECT_API_URL = 'https://octameme-api.glitch.me/subjects';

  const [getSubjectError, getSubjectLoading, getSubjectData] =
    useFetchGet(SUBJECT_API_URL);

  useEffect(() => {
    if (!getSubjectError && !getSubjectLoading) {
      setSubjects(getSubjectData);
    }

    if (getSubjectError) {
      handleToast(
        `Failed to fetch subjects! Info: "${getSubjectError}"`,
        'error'
      );
    }
  }, [getSubjectError, getSubjectLoading, getSubjectData]);

  const handleFetchDelete = (subject) => {
    fetch(`${SUBJECT_API_URL}/${subject.id}`, {
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
            `Deletion of "${subject.title}" failed! Info: "${response.error}"`,
            'error'
          );
        } else {
          handleToast(`Deleted "${subject.title}"!`, 'success');
          setSubjects(subjects.filter((s) => s.id !== subject.id));
        }
      })
      .catch((e) =>
        handleToast(
          `Deletion of "${subject.email}" failed! Info: "${e.message}"`,
          'error'
        )
      );
  };

  return (
    <>
      <div className="px-0 py-5">
        <h1>Subjects</h1>
        <Link to="/subjects/add" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </Link>
      </div>
      <div>
        <SubjectsTableWrapper
          subjects={subjects}
          getSubjectLoading={getSubjectLoading}
          handleFetchDelete={handleFetchDelete}
        />
      </div>
    </>
  );
}
