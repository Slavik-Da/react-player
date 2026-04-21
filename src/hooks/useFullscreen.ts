import { useEffect, useState, useCallback, RefObject } from 'react';

interface UseFullscreenResult {
  isFullscreen: boolean;
  toggleFullscreen: (containerRef: RefObject<HTMLDivElement | null>) => void;
}

export function useFullscreen(): UseFullscreenResult {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = useCallback((containerRef: RefObject<HTMLDivElement | null>) => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  return { isFullscreen, toggleFullscreen };
}
