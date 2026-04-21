import styles from './FullscreenButton.module.css';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenButton({ isFullscreen, onToggle }: FullscreenButtonProps) {
  return (
    <button className={styles.btn} onClick={onToggle} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
      {isFullscreen ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
          <path d="M8 3H5a2 2 0 00-2 2v3M16 3h-3a2 2 0 012 2v3M8 17H5a2 2 0 01-2-2v-3M16 17h-3a2 2 0 002-2v-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M8 8L3 3M12 8l5-5M8 12l-5 5M12 12l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 8V5a2 2 0 012-2h3M12 3h3a2 2 0 012 2v3M17 12v3a2 2 0 01-2 2h-3M8 17H5a2 2 0 01-2-2v-3" />
        </svg>
      )}
    </button>
  );
}
