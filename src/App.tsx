import { VideoPlayer } from './components/VideoPlayer/VideoPlayer';
import { usePlayerConfig } from './hooks/usePlayerConfig';
import './App.css';

function App() {
  const { data, loading, error } = usePlayerConfig('b87ac5f4-2cf0-42d1-acc8-32a89d3c71c7');

  return (
    <div className="page">
      <span className="page-label">Video player</span>
      <div className="player-container">
        {loading && <span className="page-label">Loading…</span>}
        {error && <span className="page-label">{error}</span>}
        {data && <VideoPlayer config={data} />}
      </div>
    </div>
  );
}

export default App;
