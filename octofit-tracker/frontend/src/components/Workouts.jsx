import { useCollection } from './useCollection.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const { error, items: workouts, status } = useCollection(workoutsEndpoint)

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Plans</p>
        <h2>Workouts</h2>
      </div>

      {status === 'loading' && <p className="status-text">Loading workouts...</p>}
      {status === 'error' && <p className="status-text text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="workout-list">
          {workouts.map((workout) => (
            <article className="workout-row" key={workout._id || workout.name}>
              <div>
                <strong>{workout.name}</strong>
                <span>{workout.focusArea}</span>
              </div>
              <span>{workout.level}</span>
              <span>{workout.durationMinutes} min</span>
              <span>{workout.exercises?.join(', ')}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts