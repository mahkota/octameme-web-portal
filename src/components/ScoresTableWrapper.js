/* eslint-disable react/prop-types */
import React from 'react';
import ScoreItem from './ScoreItem';
// import MemeItem from './MemeItem';

export default function ScoresTableWrapper(props) {
  const { scores, getScoreLoading } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Student</th>
          <th scope="col">n Questions</th>
          <th scope="col">n Correct Answer</th>
          <th scope="col">Final Score</th>
          <th scope="col">Created At</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {scores.map((score, index) => (
          <ScoreItem score={score} index={index} />
        ))}
        {getScoreLoading ? (
          <tr>
            <td colSpan="7">
              <i>Loading...</i>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
