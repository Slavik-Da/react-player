import { formatTime } from '../../utils/formatTime';
import styles from './TimelineTooltip.module.css';

interface TimelineTooltipProps {
  x: number;
  time: number;
  chapterTitle: string;
}

export function TimelineTooltip({ x, time, chapterTitle }: TimelineTooltipProps) {
  return (
    <div className={styles.tooltip} style={{ left: x }}>
      <div className={styles.body}>
        {chapterTitle && <span className={styles.chapter}>{chapterTitle}</span>}
        <span className={styles.time}>{formatTime(time)}</span>
      </div>
      <div className={styles.arrow} />
    </div>
  );
}
