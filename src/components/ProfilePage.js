import React from 'react'
import '../styles/ProfilePage.css'

function ProfilePage({ user, handleLogout }) {
  return (
    <div className="profile-container">
      <h2>Welcome, {user.email}</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default ProfilePage
