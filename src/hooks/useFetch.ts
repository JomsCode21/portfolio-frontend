import { useEffect, useState } from 'react';

export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    fetcher()
      .then((r) => setData(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, deps);
  return { data, loading, error, reload: load };
}
