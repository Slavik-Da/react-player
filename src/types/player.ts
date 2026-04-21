export interface Chapter {
  title: string;
  start: number;
  end: number;
}

export interface QualityLevel {
  id: number;
  height: number;
  label: string;
}

export interface PlayerConfig {
  hlsPlaylistUrl: string;
  videoLength: number;
  chapters: Chapter[];
}

export interface TooltipState {
  visible: boolean;
  x: number;
  time: number;
  chapterTitle: string;
}
