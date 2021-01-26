import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import './update-profile.scss';

export function UpdateProfile(props) {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [email, updateEmail] = useState('');
    const [birthday, updateBirthday] = useState('');

    const [validated, setValidated] = useState(false);

    const handleUpdate = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        axios.put(`https://myflix-movie-application.herokuapp.com/users/${userName}`, {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                const data = response.data;
                localStorage.setItem('user', data.username);
                alert('You have successfully updated your profile.');
                window.open('/users/:username', '_self');
            })
            .catch((error) => {
                console.log(error);
                alert('An error has occurred. Please check that you have typed in valid data.')
            });
    }

    return (

        <Container className='updateProfile-view'>

            <h2>Update Profile</h2>

            <Form noValidate validated={validated} className='update-form'>

                <Form.Group controlId='formBasicUsername'>

                    <Form.Label>Change Username:</Form.Label>
                    <Form.Control required minLength='5' type='text' value={username} placeholder='Change username' onChange={e => updateUsername(e.target.value)} />
                    <Form.Text className='text-muted'>Must be alphanumeric and at least 5 characters</Form.Text>
                    <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please choose a username. Must be alphanumeric and at least 5 characters.
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group controlId='formBasicPassword'>

                    <Form.Label>Change Password:</Form.Label>
                    <Form.Control required minLength='5' type='password' value={password} placeholder='Change password' onChange={e => updatePassword(e.target.value)} />
                    <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please choose a password. Must be alphanumeric and at least 5 characters.
                    </Form.Control.Feedback>
                    <Form.Text className='text-muted'>Must be alphanumeric and at least 5 characters</Form.Text>

                </Form.Group>

                <Form.Group controlId='formBasicEmail'>

                    <Form.Label>Change Email:</Form.Label>
                    <Form.Control required type='email' value={email} placeholder='user@email.com' onChange={e => updateEmail(e.target.value)} />
                    <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group controlId='formBasicBirthday'>

                    <Form.Label>Change Birthday:</Form.Label>
                    <Form.Control required type='date' value={birthday} placeholder='DD-MM-YYYY' onChange={e => updateBirthday(e.target.value)} />
                    <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid birthday.
                    </Form.Control.Feedback>

                </Form.Group>

            </Form>

            <Button variant='success' className='update-btn' type='submit' onClick={handleUpdate}>Update</Button>
            <Link to='/users/username'>
                <Button variant='danger' className='updateHome-btn'>Cancel</Button>
            </Link>

        </Container>
    )
}

UpdateProfile.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string,
        birthday: PropTypes.instanceOf(Date)
    })
}