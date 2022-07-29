/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ScoresTableWrapper from '../../../components/ScoresTableWrapper';
import useFetchGet from '../../../hooks/useFetchGet';

export default function Score(props) {
  const { handleToast } = props;
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');

  const [titleOptInfo, setTitleOptInfo] = useState('');

  const [scores, setScores] = useState([]);
  const SCORE_API_URL = `https://octameme-api.glitch.me/scores?quizId=${quizId}&_expand=user&_expand=quiz&_sort=finalScore&_order=desc`;

  const [getScoreError, getScoreLoading, getScoreData] =
    useFetchGet(SCORE_API_URL);

  useEffect(() => {
    if (!getScoreError && !getScoreLoading) {
      setScores(getScoreData);

      if (getScoreData.length > 0) {
        setTitleOptInfo(` for "${getScoreData[0].quiz.title}"`);
      }
    }

    if (getScoreError) {
      handleToast(`Failed to fetch scores! Info: "${getScoreError}"`, 'error');
    }
  }, [getScoreError, getScoreLoading, getScoreData]);

  return (
    <>
      <div className="px-0 py-5">
        <h1>{`Leaderboard${titleOptInfo}`}</h1>
      </div>
      <div>
        <ScoresTableWrapper scores={scores} getScoreLoading={getScoreLoading} />
      </div>
    </>
  );
}
