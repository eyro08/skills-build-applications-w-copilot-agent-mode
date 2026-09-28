import { useCollection } from './useCollection.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const { error, items: users, status } = useCollection(usersEndpoint)

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>

      {status === 'loading' && <p className="status-text">Loading users...</p>}
      {status === 'error' && <p className="status-text text-danger">{error}</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table align-middle data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Team</th>
                <th>Level</th>
                <th className="text-end">Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.username}>
                  <td>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </td>
                  <td>{user.role}</td>
                  <td>{user.team}</td>
                  <td>{user.fitnessLevel}</td>
                  <td className="text-end">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users