import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        //Prevents a page refresh
        event.preventDefault();
            //Send a request to the server for authentication
        axios.post('https://myflix-movie-application.herokuapp.com/login', {
            username: username,
            password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log(e, 'The user does not exist or incorrect credentials.');
                alert('Please try again. Check that you have entered your credentials correctly.')
            });
};


    return (

        <Container fluid id='login-form'>
            <Row>
                <Col sm={12} lg={6}>
                    <h1>Welcome to MyFlix</h1>
                </Col>
                <Col sm={12} lg={6} className='form'>
                    <Form noValidate validated={validated}>

                        <Form.Group controlId='formBasicUsername'>

                            <Form.Label>Username: </Form.Label>
                            <Form.Control required minLength='5' type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                            <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please type your username.
                            </Form.Control.Feedback>

                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>

                            <Form.Label>Password: </Form.Label>
                            <Form.Control required minLength='5' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                            <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please type your password.
                            </Form.Control.Feedback>

                        </Form.Group>

                        <Button className='login-btn' variant='success' type='button' onClick={handleSubmit}>Login</Button>

                        <h3 className='register-text'>New to myFlix? Click here</h3>
                        <Link to='/register'>
                            <Button className='register-btn' variant='primary' type='button'>Register</Button>
                        </Link>

                     </Form>

                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};