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
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    time: 0,
    chapterTitle: '',
  });
  const [hoveredChapterStart, setHoveredChapterStart] = useState<number | null>(null);

  const getTimeAndX = useCallback(
    (e: React.MouseEvent): { time: number; x: number } => {
      const rect = containerRef.current!.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      return { time: ratio * duration, x: ratio * rect.width };
    },
    [duration]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const { time, x } = getTimeAndX(e);
      const chapter = chapters.find(c => time >= c.start && time <= c.end);
      setTooltip({ visible: true, x, time, chapterTitle: chapter?.title ?? '' });
      setHoveredChapterStart(chapter?.start ?? null);
    },
    [getTimeAndX, chapters]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
    setHoveredChapterStart(null);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const { time } = getTimeAndX(e);
      onSeek(time);
    },
    [getTimeAndX, onSeek]
  );

  const playheadPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={styles.segments}>
        {chapters.map(chapter => {
          const chapterDuration = chapter.end - chapter.start;
          const playedEnd = Math.min(currentTime, chapter.end);
          const bufferedEnd = Math.min(buffered, chapter.end);

          const playedPct =
            currentTime >= chapter.start
              ? Math.max(0, (playedEnd - chapter.start) / chapterDuration) * 100
              : 0;

          const bufferedPct =
            buffered >= chapter.start
              ? Math.max(0, (bufferedEnd - chapter.start) / chapterDuration) * 100
              : 0;

          const isHovered = hoveredChapterStart === chapter.start;

          return (
            <div
              key={chapter.start}
              className={styles.segment}
              style={{
                flexGrow: chapterDuration,
                background: isHovered ? '#76A4F9' : undefined,
              }}
            >
              {bufferedPct > 0 && (
                <div
                  className={styles.segmentBuffered}
                  style={{ width: `${bufferedPct}%`, background: isHovered ? '#76A4F9' : undefined }}
                />
              )}
              {playedPct > 0 && (
                <div className={styles.segmentPlayed} style={{ width: `${playedPct}%` }} />
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.playhead} style={{ left: `${playheadPct}%` }} />

      {tooltip.visible && (
        <TimelineTooltip x={tooltip.x} time={tooltip.time} chapterTitle={tooltip.chapterTitle} />
      )}
    </div>
  );
}
