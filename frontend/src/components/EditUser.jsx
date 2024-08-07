import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useGetUsersMutation, useUpdateUserMutation } from '../slices/adminApiSlice';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getUser, { data: user, error: getUserError, isLoading: isGettingUser }] = useGetUsersMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      getUser(id);
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [id, getUser, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser({ id, userData: { name, email, isAdmin } });
    navigate('/admin/dashboard');
  };

  if (isGettingUser || isUpdatingUser) {
    return <Spinner animation="border" />;
  }

  if (getUserError) {
    return <Alert variant="danger">Error: {getUserError.message}</Alert>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Update
      </Button>
    </Form>
  );
};

export default EditUser;
