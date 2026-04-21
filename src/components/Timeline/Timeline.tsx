import { useRef, useState, useCallback } from 'react';
import { Chapter, TooltipState } from '../../types/player';
import { TimelineTooltip } from '../TimelineTooltip/TimelineTooltip';
import styles from './Timeline.module.css';

interface TimelineProps {
  currentTime: number;
  buffered: number;
  duration: number;
  chapters: Chapter[];
  onSeek: (time: number) => void;
}

export function Timeline({ currentTime, buffered, duration, chapters, onSeek }: TimelineProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    time: 0,
    chapterTitle: '',
  });

  const getTimeFromEvent = useCallback(
    (e: React.MouseEvent): { time: number; x: number } => {
      const rect = barRef.current!.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const time = ratio * duration;
      const barWidth = rect.width;
      const rawX = ratio * barWidth;
      return { time, x: rawX };
    },
    [duration]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!barRef.current) return;
      const { time, x } = getTimeFromEvent(e);
      const chapter = chapters.find(c => time >= c.start && time <= c.end);
      setTooltip({
        visible: true,
        x,
        time,
        chapterTitle: chapter?.title ?? '',
      });
    },
    [getTimeFromEvent, chapters]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!barRef.current) return;
      const { time } = getTimeFromEvent(e);
      onSeek(time);
    },
    [getTimeFromEvent, onSeek]
  );

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      className={styles.container}
      ref={barRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={styles.track}>
        <div className={styles.buffer} style={{ width: `${bufferedPct}%` }} />
        <div className={styles.progress} style={{ width: `${progressPct}%` }} />
        {chapters.slice(1).map(chapter => (
          <div
            key={chapter.start}
            className={styles.separator}
            style={{ left: `${(chapter.start / duration) * 100}%` }}
          />
        ))}
      </div>
      {tooltip.visible && (
        <TimelineTooltip
          x={tooltip.x}
          time={tooltip.time}
          chapterTitle={tooltip.chapterTitle}
        />
      )}
    </div>
  );
}
