import React, { useEffect, useState } from 'react';
import SubjectsTableWrapper from '../../components/SubjectsTableWrapper';
import useFetchGet from '../../hooks/useFetchGet';

export default function Subject() {
  const [subjects, setSubjects] = useState([]);
  const SUBJECT_API_URL = 'https://octameme-api.herokuapp.com/subjects';

  const [getSubjectError, getSubjectLoading, getSubjectData] =
    useFetchGet(SUBJECT_API_URL);

  useEffect(() => {
    if (!getSubjectError && !getSubjectLoading) {
      setSubjects(getSubjectData);
    }
  }, [getSubjectError, getSubjectLoading, getSubjectData]);

  return (
    <>
      <div className="px-0 py-5">
        <h1>Subjects</h1>
        <button type="button" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </button>
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
