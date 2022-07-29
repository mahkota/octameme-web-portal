/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import QuestionsTableWrapper from '../../../components/QuestionsTableWrapper';
import useFetchGet from '../../../hooks/useFetchGet';

export default function Question(props) {
  const { handleToast } = props;
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');

  const [titleOptInfo, setTitleOptInfo] = useState('');

  const [questions, setQuestions] = useState([]);
  const QUESTION_API_URL = `https://octameme-api.glitch.me/questions?quizId=${quizId}&_expand=quiz`;

  const [getQuestionError, getQuestionLoading, getQuestionData] =
    useFetchGet(QUESTION_API_URL);

  useEffect(() => {
    if (!getQuestionError && !getQuestionLoading) {
      setQuestions(getQuestionData);

      if (getQuestionData.length > 0) {
        setTitleOptInfo(` for "${getQuestionData[0].quiz.title}"`);
      }
    }

    if (getQuestionError) {
      handleToast(
        `Failed to fetch questions! Info: "${getQuestionError}"`,
        'error'
      );
    }
  }, [getQuestionError, getQuestionLoading, getQuestionData]);

  return (
    <>
      <div className="px-0 py-5">
        <h1>{`Questions${titleOptInfo}`}</h1>
        <Link to="/quizzes" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-arrow-left" />
          <span className="ms-2">Go Back</span>
        </Link>
        <Link
          to={`/questions/add?quizId=${quizId}`}
          className="btn btn-sm btn-outline-primary ms-2"
        >
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </Link>
      </div>
      <div>
        <QuestionsTableWrapper
          questions={questions}
          getQuestionLoading={getQuestionLoading}
          handleFetchDelete={null}
        />
      </div>
    </>
  );
}
