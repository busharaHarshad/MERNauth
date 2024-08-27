import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={8} className='text-center'>
          {userInfo ? (
            <h1>Welcome, {userInfo.name}!</h1>
          ) : (
            <h1>Hello! Please log in.</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
