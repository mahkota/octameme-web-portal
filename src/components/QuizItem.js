/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function QuizItem(props) {
  const { quiz, index, handleFetchDelete } = props;
  const createdAtFormatted = moment(quiz.createdAt).format('LLLL');
  const startAtFormatted = moment(quiz.startAt).format('LLLL');
  const endAtFormatted = moment(quiz.endAt).format('LLLL');

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{quiz.title}</td>
      <td>{quiz.subject.title}</td>
      <td>{startAtFormatted}</td>
      <td>{endAtFormatted}</td>
      <td>{createdAtFormatted}</td>
      <td>{quiz.createdBy}</td>
      <td>
        <div className="btn-group" role="group">
          <Link
            to={`/questions?quizId=${quiz.id}`}
            className="btn btn-sm btn-outline-primary"
          >
            See Questions
          </Link>
          <Link
            to={`/scores/${quiz.id}`}
            className="btn btn-sm btn-outline-success"
          >
            See Scores
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => {
              handleFetchDelete(quiz);
            }}
          >
            <span className="fa-solid fa-trash" aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  );
}
