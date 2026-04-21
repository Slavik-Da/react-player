import { VideoPlayer } from './components/VideoPlayer/VideoPlayer';
import { playerConfig } from './data/playerConfig';
import './App.css';

function App() {
  return (
    <div className="page">
      <span className="page-label">Video player</span>
      <div className="player-container">
        <VideoPlayer config={playerConfig} />
      </div>
    </div>
  );
}

export default App;
