/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

export default function QuestionItem(props) {
  const { question, index, handleFetchDelete } = props;
  const createdAtFormatted = moment(question.createdAt).format('LLLL');

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{question.questionDetail}</td>
      <td>{question.correctAnswerOption}</td>
      <td>{question.answerDetail}</td>
      <td>
        <tr>a. {question.optionA}</tr>
        <tr>b. {question.optionB}</tr>
        <tr>c. {question.optionC}</tr>
        <tr>d. {question.optionD}</tr>
      </td>
      <td>{createdAtFormatted}</td>
      <td>{question.createdBy}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            handleFetchDelete(question);
          }}
        >
          <span className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
