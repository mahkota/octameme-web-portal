/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import StudentsTableWrapper from '../../../components/StudentsTableWrapper';
import useFetchGet from '../../../hooks/useFetchGet';

export default function Student(props) {
  const { handleToast } = props;

  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subjectId');

  const [titleOptInfo, setTitleOptInfo] = useState('');

  const [students, setStudents] = useState([]);
  const STUDENT_API_URL = `https://octameme-api.glitch.me/students?subjectId=${subjectId}&_expand=subject&_expand=user`;

  const [getStudentError, getStudentLoading, getStudentData] =
    useFetchGet(STUDENT_API_URL);

  useEffect(() => {
    if (!getStudentError && !getStudentLoading) {
      setStudents(getStudentData);

      if (getStudentData.length > 0) {
        setTitleOptInfo(` from "${getStudentData[0].subject.title}"`);
      }
    }

    if (getStudentError) {
      handleToast(
        `Failed to fetch teacher! Info: "${getStudentError}"`,
        'error'
      );
    }
  }, [getStudentError, getStudentLoading, getStudentData]);

  return (
    <>
      <div className="px-0 py-5">
        <h1>{`Students${titleOptInfo}`}</h1>
        <Link to="/subjects" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
        <Link
          to={`/students/add?subjectId=${subjectId}`}
          className="btn btn-sm btn-outline-primary ms-2"
        >
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </Link>
      </div>
      <div>
        <StudentsTableWrapper
          students={students}
          getStudentLoading={getStudentLoading}
          handleFetchDelete={null}
        />
      </div>
    </>
  );
}
