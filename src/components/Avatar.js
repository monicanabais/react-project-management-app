import './Avatar.css';

const Avatar = ({ src, size = "large" }) => {
  return (
    <div className={`avatar ${size}`}>
      <img src={src} alt="user avatar" />
    </div>
  )
}

export default Avatar