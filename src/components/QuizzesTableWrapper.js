/* eslint-disable react/prop-types */
import React from 'react';
import QuizItem from './QuizItem';

export default function QuizzesTableWrapper(props) {
  const { quizzes, getQuizLoading, handleFetchDelete } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Subject</th>
          <th scope="col">Start At</th>
          <th scope="col">End At</th>
          <th scope="col">Created At</th>
          <th scope="col">Created By</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {quizzes.map((quiz, index) => (
          <QuizItem
            quiz={quiz}
            index={index}
            handleFetchDelete={handleFetchDelete}
          />
        ))}
        {getQuizLoading ? (
          <tr>
            <td colSpan="8">
              <i>Loading...</i>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
