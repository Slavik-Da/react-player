import { useEffect, useRef, useState, RefObject } from 'react';
import Hls from 'hls.js';
import { QualityLevel } from '../types/player';

interface UseHlsResult {
  qualityLevels: QualityLevel[];
  currentQuality: number;
  isNative: boolean;
  setQuality: (id: number) => void;
}

export function useHls(videoRef: RefObject<HTMLVideoElement | null>, url: string): UseHlsResult {
  const hlsRef = useRef<Hls | null>(null);
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        const levels: QualityLevel[] = data.levels.map((l, i) => ({
          id: i,
          height: l.height,
          label: `${l.height}p`,
        }));
        setQualityLevels(levels);
        setCurrentQuality(-1);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentQuality(data.level);
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      setIsNative(true);
    }
  }, [url, videoRef]);

  const setQuality = (id: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = id;
      if (id === -1) setCurrentQuality(-1);
    }
  };

  return { qualityLevels, currentQuality, isNative, setQuality };
}
