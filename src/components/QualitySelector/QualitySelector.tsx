import { useEffect, useMemo, useRef, useState } from 'react';
import { QualityLevel } from '../../types/player';
import styles from './QualitySelector.module.css';

interface QualitySelectorProps {
  qualityLevels: QualityLevel[];
  currentQuality: number;
  onQualityChange: (id: number) => void;
}

export function QualitySelector({ qualityLevels, currentQuality, onQualityChange }: QualitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const reversedLevels = useMemo(() => [...qualityLevels].reverse(), [qualityLevels]);
  const currentLabel = qualityLevels.find(l => l.id === currentQuality)?.label ?? 'Auto';

  if (qualityLevels.length === 0) return null;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {isOpen && (
        <ul className={styles.dropdown}>
          <li
            className={currentQuality === -1 ? styles.active : ''}
            onClick={() => { onQualityChange(-1); setIsOpen(false); }}
          >
            Auto
          </li>
          {reversedLevels.map(level => (
            <li
              key={level.id}
              className={level.id === currentQuality ? styles.active : ''}
              onClick={() => { onQualityChange(level.id); setIsOpen(false); }}
            >
              {level.label}
            </li>
          ))}
        </ul>
      )}
      <button
        className={styles.btn}
        onClick={() => setIsOpen(v => !v)}
        aria-label="Quality settings"
        title={currentLabel}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      </button>
    </div>
  );
}
