import { useCollection } from './useCollection.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'Pending'
}

function Activities() {
  const { error, items: activities, status } = useCollection(activitiesEndpoint)

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Logs</p>
        <h2>Activities</h2>
      </div>

      {status === 'loading' && <p className="status-text">Loading activities...</p>}
      {status === 'error' && <p className="status-text text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table align-middle data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Activity</th>
                <th>Intensity</th>
                <th>Date</th>
                <th className="text-end">Minutes</th>
                <th className="text-end">Points</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.username}-${activity.completedAt}`}>
                  <td>{activity.username}</td>
                  <td>{activity.type}</td>
                  <td>{activity.intensity}</td>
                  <td>{formatDate(activity.completedAt)}</td>
                  <td className="text-end">{activity.durationMinutes}</td>
                  <td className="text-end">{activity.pointsEarned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities