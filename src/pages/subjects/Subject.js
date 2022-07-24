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
        />
      </div>
    </>
  );
}
