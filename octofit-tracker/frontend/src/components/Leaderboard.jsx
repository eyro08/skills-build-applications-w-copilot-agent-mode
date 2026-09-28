import { useCollection } from './useCollection.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const { error, items: leaderboard, status } = useCollection(leaderboardEndpoint)

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Standings</p>
        <h2>Leaderboard</h2>
      </div>

      {status === 'loading' && <p className="status-text">Loading leaderboard...</p>}
      {status === 'error' && <p className="status-text text-danger">{error}</p>}
      {status === 'ready' && (
        <ol className="leaderboard-list">
          {leaderboard.map((entry) => (
            <li key={entry._id || entry.username}>
              <span className="rank">#{entry.rank}</span>
              <div>
                <strong>{entry.username}</strong>
                <span>{entry.team}</span>
              </div>
              <span>{entry.totalPoints} pts</span>
              <span>{entry.activeDays} days</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default Leaderboard