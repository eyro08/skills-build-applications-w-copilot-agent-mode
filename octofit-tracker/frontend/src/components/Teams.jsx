import { useCollection } from './useCollection.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const { error, items: teams, status } = useCollection(teamsEndpoint)

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h2>Teams</h2>
      </div>

      {status === 'loading' && <p className="status-text">Loading teams...</p>}
      {status === 'error' && <p className="status-text text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="team-grid">
          {teams.map((team) => (
            <article className="metric-card" key={team._id || team.name}>
              <span>{team.mascot}</span>
              <h3>{team.name}</h3>
              <dl>
                <div>
                  <dt>Coach</dt>
                  <dd>{team.coach}</dd>
                </div>
                <div>
                  <dt>Members</dt>
                  <dd>{team.memberCount}</dd>
                </div>
                <div>
                  <dt>Weekly goal</dt>
                  <dd>{team.weeklyGoalMinutes} min</dd>
                </div>
                <div>
                  <dt>Points</dt>
                  <dd>{team.totalPoints}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams