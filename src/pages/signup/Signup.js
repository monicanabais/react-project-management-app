import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleFileChange = (e) => {
    setAvatar(null);

    let selected = e.target.files[0];
    if (!selected) {
      setAvatarError('Please select a file');
    } else if (!selected.type.includes('image')) {
      setAvatarError('Selected file must be an image');
    } else if (selected.size > 100000) {
      setAvatarError('Image file size is too big');
    } else {
      setAvatarError(null);
      setAvatar(selected);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, avatar);
  }
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email</span>
        <input type="email" required onChange={e => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>Password</span>
        <input type="password" required onChange={e => setPassword(e.target.value)} value={password} />
      </label>
      <label>
        <span>Display name</span>
        <input type="text" required onChange={e => setDisplayName(e.target.value)} value={displayName} />
      </label>
      <label>
        <span>Avatar</span>
        <input type="file" required onChange={handleFileChange} />
        {avatarError && <div className="error">{avatarError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading</button>} 
      {error && <div className="error">{error}</div>}

    </form>
  )
}

export default Signup;