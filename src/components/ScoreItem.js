/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function ScoreItem(props) {
  const { score, index } = props;
  const createdAtFormatted = moment(ScoreItem.createdAt).format('LLLL');

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{score.user.name}</td>
      <td>{score.nQuestions}</td>
      <td>{score.nCorrectAnswers}</td>
      <td>{score.finalScore}</td>
      <td>{createdAtFormatted}</td>
      <td>
        <Link
          to={`/answers?quizId=${score.quizId}&userId=${score.userId}`}
          className="btn btn-sm btn-outline-primary"
        >
          See Answers
        </Link>
      </td>
    </tr>
  );
}
