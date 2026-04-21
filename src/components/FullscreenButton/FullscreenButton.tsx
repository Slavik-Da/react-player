import styles from './FullscreenButton.module.css';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenButton({ isFullscreen, onToggle }: FullscreenButtonProps) {
  return (
    <button className={styles.btn} onClick={onToggle} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
      {isFullscreen ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="square">
          <path d="M6,0 L0,0 L0,6" />
          <path d="M12,0 L18,0 L18,6" />
          <path d="M0,12 L0,18 L6,18" />
          <path d="M18,12 L18,18 L12,18" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="square">
          <path d="M6,0 L0,0 L0,6" />
          <path d="M12,0 L18,0 L18,6" />
          <path d="M0,12 L0,18 L6,18" />
          <path d="M18,12 L18,18 L12,18" />
        </svg>
      )}
    </button>
  );
}
