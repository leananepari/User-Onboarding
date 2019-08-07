import React from 'react';

function User({ user }) {

  return (
    <div className="user-card">
      <h4>{user.name}</h4>
      <p style={{margin: '5px'}}>{user.email}</p>
    </div>
  )
}

export default User;