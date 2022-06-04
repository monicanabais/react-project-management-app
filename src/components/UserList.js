import './UserList.css'
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';

const UserList = () => {
  const { error, documents } = useCollection('users');
  return (
    <div className="user-list">
      <h2>Users</h2>
      {error && <div className="error">{error}</div>}
      {documents && documents.map(user => (
        <div key={user.id} className="user-list-item">
          <span className={`user-status ${user.online ? 'online' : 'offline'}`}></span>
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} size="small" />
        </div>
      ))}
    </div>
  )
}

export default UserList