import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../slices/adminApiSlice'; 
import { Container, Form, Button, Alert } from 'react-bootstrap';

const CreateUserScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({ name, email, password }).unwrap();
      toast.success('User created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(`Failed to create user: ${error.message || 'Please try again.'}`);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Create New User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create User'}
        </Button>
        {isError && <Alert variant="danger" className="mt-3">Error: {error.message}</Alert>}
      </Form>
    </Container>
  );
};

export default CreateUserScreen;
