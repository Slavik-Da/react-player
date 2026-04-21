import styles from './PlayButton.module.css';

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function PlayButton({ isPlaying, onToggle }: PlayButtonProps) {
  return (
    <button className={styles.btn} onClick={onToggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
      {isPlaying ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
          <rect x="4" y="3" width="4" height="14" rx="1" />
          <rect x="12" y="3" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
          <path d="M5 3.5l12 6.5-12 6.5V3.5z" />
        </svg>
      )}
    </button>
  );
}
