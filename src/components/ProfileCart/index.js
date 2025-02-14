import './index.css'

const ProfileCart = props => {
  const {profileData} = props
  const {name, shortBio, profileImageUrl} = profileData
  return (
    <div className="profile-cart">
      <img src={profileImageUrl} alt="profile" />
      <h1 className="name">{name}</h1>
      <p className="bio">{shortBio}</p>
    </div>
  )
}

export default ProfileCart
