/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuizzesTableWrapper from '../../components/QuizzesTableWrapper';
import useFetchGet from '../../hooks/useFetchGet';

export default function Quiz(props) {
  const { handleToast } = props;

  const [quizzes, setQuizzes] = useState([]);
  const QUIZ_API_URL = 'https://octameme-api.glitch.me/quizzes?_expand=subject';

  const [getQuizError, getQuizLoading, getQuizData] = useFetchGet(QUIZ_API_URL);

  useEffect(() => {
    if (!getQuizError && !getQuizLoading) {
      setQuizzes(getQuizData);
    }

    if (getQuizError) {
      handleToast(`Failed to fetch quizzes! Info: "${getQuizError}"`, 'error');
    }
  }, [getQuizError, getQuizLoading, getQuizData]);

  return (
    <>
      <div className="px-0 py-5">
        <h1>Quizzes</h1>
        <Link to="/quizzes/add" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </Link>
      </div>
      <div>
        <QuizzesTableWrapper
          quizzes={quizzes}
          getQuizLoading={getQuizLoading}
          handleFetchDelete={null}
        />
      </div>
    </>
  );
}
