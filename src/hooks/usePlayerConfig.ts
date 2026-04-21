import { useEffect, useState } from 'react';
import { PlayerConfig } from '../types/player';
import { playerConfig } from '../data/playerConfig';

interface UsePlayerConfigResult {
  data: PlayerConfig | null;
  loading: boolean;
  error: string | null;
}

async function fetchPlayerConfig(_videoId: string): Promise<PlayerConfig> {
  // Simulates network latency; replace with a real fetch call:
  // return fetch(`/api/videos/${videoId}`).then(r => r.json());
  await new Promise(resolve => setTimeout(resolve, 800));
  return playerConfig;
}

export function usePlayerConfig(videoId: string): UsePlayerConfigResult {
  const [data, setData] = useState<PlayerConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPlayerConfig(videoId)
      .then(config => {
        if (!cancelled) {
          setData(config);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load video');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [videoId]);

  return { data, loading, error };
}
