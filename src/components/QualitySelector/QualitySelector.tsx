import { useEffect, useRef, useState } from 'react';
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

  if (qualityLevels.length === 0) return null;

  const currentLabel =
    currentQuality === -1
      ? 'Auto'
      : qualityLevels.find(l => l.id === currentQuality)?.label ?? 'Auto';

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
          {[...qualityLevels].reverse().map(level => (
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 13a3 3 0 100-6 3 3 0 000 6zm0-1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 2a1 1 0 00-.986.836l-.29 1.742a6.03 6.03 0 00-1.477.862l-1.643-.657A1 1 0 004.38 5.31L2.88 7.895a1 1 0 00.248 1.3l1.395 1.047a6.074 6.074 0 000 1.516L3.128 12.805a1 1 0 00-.248 1.3l1.5 2.598a1 1 0 001.224.367l1.643-.657c.466.34.963.628 1.477.862l.29 1.742A1 1 0 0010 18a1 1 0 00.986-.836l.29-1.742a6.03 6.03 0 001.477-.862l1.643.657a1 1 0 001.224-.367l1.5-2.598a1 1 0 00-.248-1.3l-1.395-1.047a6.074 6.074 0 000-1.516l1.395-1.048a1 1 0 00.248-1.3l-1.5-2.597a1 1 0 00-1.224-.367l-1.643.657a6.03 6.03 0 00-1.477-.862l-.29-1.742A1 1 0 0010 2z"
          />
        </svg>
      </button>
    </div>
  );
}
