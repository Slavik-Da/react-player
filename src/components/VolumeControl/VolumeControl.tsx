import styles from './VolumeControl.module.css';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
}

export function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }: VolumeControlProps) {
  const displayVolume = isMuted ? 0 : volume;

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={onToggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
        {displayVolume === 0 ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
            <path d="M3 7v6h3l5 4V3L6 7H3z" />
            <line x1="14" y1="7" x2="18" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="7" x2="14" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : displayVolume < 0.5 ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
            <path d="M3 7v6h3l5 4V3L6 7H3z" />
            <path d="M13 8.5a3 3 0 010 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
            <path d="M3 7v6h3l5 4V3L6 7H3z" />
            <path d="M13 6a5 5 0 010 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M15.5 3.5a9 9 0 010 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        )}
      </button>
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={displayVolume}
          onChange={e => onVolumeChange(parseFloat(e.target.value))}
          className={styles.slider}
          style={{ '--fill': `${displayVolume * 100}%` } as React.CSSProperties}
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
