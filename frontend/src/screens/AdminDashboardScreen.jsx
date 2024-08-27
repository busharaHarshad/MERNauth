import React from 'react';
import UserList from '../components/UserList';
import { useNavigate } from 'react-router-dom';
const AdminDashboardScreen = () => {
  const navigate = useNavigate();

  const handleCreateUserClick = () => {
    navigate('/admin/createuser');
  };
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleCreateUserClick}>Create User</button>
      <h1> </h1>
      <UserList />

    </div>
  );
};

export default AdminDashboardScreen;
