import { useEffect, useState } from 'react';

export default function useFetchGet(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('cannot fetch');
        // console.log(response);
        return response.json();
      })
      .then((dataJson) => {
        // console.log(dataJson);
        setData(dataJson);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [error, loading, data];
}
