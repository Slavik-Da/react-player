# React Video Player

A custom HLS video player built from scratch with React + TypeScript. No third-party player libraries — only [hls.js](https://github.com/video-dev/hls.js/) for HLS streaming.

## Features

- HLS streaming via hls.js
- Video quality / resolution switching (720p, 1080p, etc.)
- Chapter markers on the timeline
- Timeline hover: tooltip showing chapter name and current time
- Timeline click-to-seek
- Volume control with mute toggle
- Fullscreen support (button + double-click)
- Controls auto-hide after 3 seconds of inactivity

## Setup

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

**Build for production:**

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── data/playerConfig.ts      # HLS URL, duration, chapters
├── types/player.ts           # Shared TypeScript interfaces
├── utils/formatTime.ts       # Seconds → "M:SS" formatter
├── hooks/
│   ├── useHls.ts             # hls.js setup + quality switching
│   ├── useVideoControls.ts   # Playback state (time, play/pause, volume)
│   └── useFullscreen.ts      # Fullscreen API wrapper
└── components/
    ├── VideoPlayer/          # Root coordinator component
    ├── Controls/             # Overlay controls bar
    ├── Timeline/             # Progress bar, chapters, seek
    ├── TimelineTooltip/      # Hover tooltip
    ├── PlayButton/           # Play/Pause SVG button
    ├── VolumeControl/        # Mute + range slider
    ├── TimeDisplay/          # "0:00 / 5:48" text
    ├── QualitySelector/      # Gear icon + quality dropdown
    └── FullscreenButton/     # Expand/compress SVG button
```

## Key Decisions

**No abstraction over the `<video>` element.** The `videoRef` is passed directly to hooks that attach event listeners and call native video methods. This avoids an unnecessary wrapper layer and keeps the code easy to reason about.

**Static `duration` from config.** The timeline uses `config.videoLength` rather than `video.duration` from metadata, so chapter positions render immediately without waiting for the video to load metadata.

**CSS Modules throughout.** Scoped styles per component with no global class leakage and no CSS-in-JS runtime overhead.

**Safari native HLS fallback.** When `Hls.isSupported()` is false but the browser supports HLS natively (Safari), the stream URL is assigned directly to `video.src`. The quality selector is hidden in this path since ABR is handled by the browser.
