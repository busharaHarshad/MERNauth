import React, { useState, useEffect } from 'react';
import { useGetUsersMutation, useDeleteUserMutation, useSearchUsersQuery } from '../slices/adminApiSlice';
import { Table, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const UserList = () => {
  const [getUsers, { data: users = [], error, isLoading }] = useGetUsersMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults = [], isLoading: isSearching } = useSearchUsersQuery(searchQuery, {
    skip: !searchQuery, // Skip query if searchQuery is empty
  });

  useEffect(() => {
    if (!searchQuery) {
      getUsers();
    }
  }, [getUsers, searchQuery]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
       getUsers();  
      
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading || isDeleting || isSearching) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }

  const usersToDisplay = searchQuery ? searchResults : users;

  return (
    <>
      <Form>
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Serial</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.length > 0 ? (
            usersToDisplay.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                <Link to={`/admin/users/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    Edit
                  </Button>
                </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
