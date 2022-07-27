/* eslint-disable react/prop-types */
import React from 'react';
import QuestionItem from './QuestionItem';

export default function QuestionsTableWrapper(props) {
  const { questions, getQuestionLoading, handleFetchDelete } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Question</th>
          <th scope="col">Answer</th>
          <th scope="col">Answer Detail</th>
          <th scope="col">Options</th>
          <th scope="col">Created At</th>
          <th scope="col">Created By</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {questions.map((question, index) => (
          <QuestionItem
            question={question}
            index={index}
            handleFetchDelete={handleFetchDelete}
          />
        ))}
        {getQuestionLoading ? (
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
