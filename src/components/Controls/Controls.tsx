import { Chapter, QualityLevel } from '../../types/player';
import { PlayButton } from '../PlayButton/PlayButton';
import { VolumeControl } from '../VolumeControl/VolumeControl';
import { TimeDisplay } from '../TimeDisplay/TimeDisplay';
import { QualitySelector } from '../QualitySelector/QualitySelector';
import { FullscreenButton } from '../FullscreenButton/FullscreenButton';
import { Timeline } from '../Timeline/Timeline';
import styles from './Controls.module.css';

interface ControlsProps {
  visible: boolean;
  isPlaying: boolean;
  currentTime: number;
  buffered: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  qualityLevels: QualityLevel[];
  currentQuality: number;
  isNative: boolean;
  isFullscreen: boolean;
  chapters: Chapter[];
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
  onQualityChange: (id: number) => void;
  onToggleFullscreen: () => void;
}

export function Controls({
  visible,
  isPlaying,
  currentTime,
  buffered,
  duration,
  volume,
  isMuted,
  qualityLevels,
  currentQuality,
  isNative,
  isFullscreen,
  chapters,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onQualityChange,
  onToggleFullscreen,
}: ControlsProps) {
  return (
    <div className={`${styles.bar} ${!visible ? styles.hidden : ''}`}>
      <Timeline
        currentTime={currentTime}
        buffered={buffered}
        duration={duration}
        chapters={chapters}
        onSeek={onSeek}
      />
      <div className={styles.row}>
        <div className={styles.left}>
          <PlayButton isPlaying={isPlaying} onToggle={onTogglePlay} />
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />
          <TimeDisplay currentTime={currentTime} duration={duration} />
        </div>
        <div className={styles.right}>
          {!isNative && (
            <QualitySelector
              qualityLevels={qualityLevels}
              currentQuality={currentQuality}
              onQualityChange={onQualityChange}
            />
          )}
          <FullscreenButton
            isFullscreen={isFullscreen}
            onToggle={() => onToggleFullscreen()}
          />
        </div>
      </div>
    </div>
  );
}
