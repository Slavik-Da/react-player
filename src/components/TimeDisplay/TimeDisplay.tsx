import { formatTime } from '../../utils/formatTime';
import styles from './TimeDisplay.module.css';

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

export function TimeDisplay({ currentTime, duration }: TimeDisplayProps) {
  return (
    <span className={styles.time}>
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  );
}
