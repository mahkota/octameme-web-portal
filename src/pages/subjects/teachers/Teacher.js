/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TeachersTableWrapper from '../../../components/TeachersTableWrapper';
import useFetchGet from '../../../hooks/useFetchGet';

export default function Teacher(props) {
  const { handleToast } = props;
  const { subjectId } = useParams();

  const [titleOptInfo, setTitleOptInfo] = useState('');

  const [teachers, setTeachers] = useState([]);
  const TEACHER_API_URL = `https://octameme-api.glitch.me/teachers?subjectId=${subjectId}&_expand=subject&_expand=user`;

  const [getTeacherError, getTeacherLoading, getTeacherData] =
    useFetchGet(TEACHER_API_URL);

  useEffect(() => {
    if (!getTeacherError && !getTeacherLoading) {
      setTeachers(getTeacherData);

      if (getTeacherData.length > 0) {
        setTitleOptInfo(` for "${getTeacherData[0].subject.title}"`);
      }
    }

    if (getTeacherError) {
      handleToast(
        `Failed to fetch teacher! Info: "${getTeacherError}"`,
        'error'
      );
    }
  }, [getTeacherError, getTeacherLoading, getTeacherData]);

  return (
    <>
      <div className="px-0 py-5">
        <h1>{`Teachers${titleOptInfo}`}</h1>
        <Link to="/subjects" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
        <Link
          to="/teachers/add/1"
          className="btn btn-sm btn-outline-primary ms-2"
        >
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </Link>
      </div>
      <div>
        {console.log(teachers)}
        {/* <QuestionsTableWrapper
          questions={questions}
          getTeacherLoading={getTeacherLoading}
          handleFetchDelete={null}
        /> */}
        <TeachersTableWrapper
          teachers={teachers}
          getTeacherLoading={getTeacherLoading}
          handleFetchDelete={null}
        />
      </div>
    </>
  );
}
