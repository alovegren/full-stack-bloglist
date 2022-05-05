import React from 'react';

import { Link } from 'react-router-dom';

const Users = ({ users }) => (
  <div>
    <h2>users</h2>
    <ul>
      {users.map(user => <li key={user.id}>
        <Link to={`/users/${user.id}`}>
          {user.name}: {user.blogs.length} blogs created
        </Link>
      </li>)}
    </ul>
  </div>
);

export default Users;