import { useRef, useState, useCallback, useEffect } from 'react';
import { PlayerConfig } from '../../types/player';
import { useHls } from '../../hooks/useHls';
import { useVideoControls } from '../../hooks/useVideoControls';
import { useFullscreen } from '../../hooks/useFullscreen';
import { Controls } from '../Controls/Controls';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  config: PlayerConfig;
}

export function VideoPlayer({ config }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const CONTROLS_HIDE_MS = 3000;

  const [controlsVisible, setControlsVisible] = useState(true);

  const { qualityLevels, currentQuality, isNative, setQuality } = useHls(videoRef, config.hlsPlaylistUrl);
  const { isPlaying, currentTime, buffered, volume, isMuted, togglePlay, seek, setVolume, toggleMute } =
    useVideoControls(videoRef);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const showControls = useCallback(() => {
    setControlsVisible(true);
    clearTimeout(hideTimerRef.current);
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_MS);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(hideTimerRef.current);
      setControlsVisible(true);
    } else {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_MS);
    }
    return () => clearTimeout(hideTimerRef.current);
  }, [isPlaying]);

  const handleToggleFullscreen = useCallback(() => {
    toggleFullscreen(containerRef);
  }, [toggleFullscreen]);

  const handleDoubleClick = useCallback(() => {
    handleToggleFullscreen();
  }, [handleToggleFullscreen]);

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      onMouseMove={showControls}
      onMouseLeave={() => {
        if (isPlaying) setControlsVisible(false);
      }}
    >
      <video
        ref={videoRef}
        className={styles.video}
        onDoubleClick={handleDoubleClick}
        onClick={togglePlay}
        playsInline
      />
      <Controls
        visible={controlsVisible}
        isPlaying={isPlaying}
        currentTime={currentTime}
        buffered={buffered}
        duration={config.videoLength}
        volume={volume}
        isMuted={isMuted}
        qualityLevels={qualityLevels}
        currentQuality={currentQuality}
        isNative={isNative}
        isFullscreen={isFullscreen}
        chapters={config.chapters}
        onTogglePlay={togglePlay}
        onSeek={seek}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
        onQualityChange={setQuality}
        onToggleFullscreen={handleToggleFullscreen}
      />
    </div>
  );
}
