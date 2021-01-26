import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import './profile-view.scss';

export class ProfileView extends React.Component {

    constructor() {
        super();

        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            FavoriteMovies: [],
            movies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken)
    }

    getUser(token) {
        const userName = localStorage.getItem('user')
        axios.get(`https://myflix-movie-application.herokuapp.com/users/${userName}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    FavoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
    }

    deregisterUser() {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        if (confirm('Please confirm that you want to delete your profile.')) {
            return (
            axios.delete(`https://myflix-movie-application.herokuapp.com/users/${userName}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    console.log(response);
                    alert('You have been deleted from the registry.');
                    this.logOut();
                })
            )
        }
    }

    deleteFaveMovie(movie) {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        axios.delete(`https://myflix-movie-application.herokuapp.com/users/${userName}/movies/delete/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                alert('The movie has been removed from your Favorites.');
                this.componentDidMount();
            });
    }

    render() {

        const { movies } = this.props;
        const userMovies = this.state.FavoriteMovies;
        const FaveMovies = movies.filter(movie => userMovies.includes(movie._id));

        return (

        <Container className="profile-view">
            <Row className='profile-row'>

                    <h2>User Information</h2>

                    <Card className='profileCard'>

                        <Card.Body className='profile-card'>

                            <Card.Text>
                                <span className="label">Username: </span>
                                    {this.state.username}
                                    <br/>
                                <span className="label">Email: </span>
                                    {this.state.email}
                                    <br />
                                <span className='label'>Birthday: </span>
                                    {this.state.birthday}
                            </Card.Text>

                        </Card.Body>

                    </Card>

                    <div>
                        <Link to='/users/:username/update'>
                            <Button variant='success' className='update-button'>Update Profile</Button>
                        </Link>

                        <Button variant='danger' onClick={() => this.deregisterUser()} className='delete-user-button'>Delete Profile</Button>

                        <Link to='/'>
                            <Button variant='light' className='home-button'>Home</Button>
                        </Link>
                    </div>
            </Row>

            <Row className='faveMovies'>

                    <h2>Favorite Movies</h2>

                    <div className='faveMovies-container row'>
                    {FaveMovies.map(movie => {
                        return (

                        <Card key={movie._id} border='dark' className='faveMovies_card'>

                            <Card.Img variant='top' src={movie.ImagePath} />
                            <Card.Header>
                                <Card.Body>
                                    <Card.Title as='h1'>{movie.Title}</Card.Title>
                                </Card.Body>
                            </Card.Header>

                            <Link to={`/movies/${movie._id}`}>
                                <Button variant='info' className='card-button profile-details-btn'>Details</Button>
                            </Link>

                            <Button variant='secondary' onClick={() => this.deleteFaveMovie(movie)}>Remove Movie</Button>

                        </Card>

                        )
                    })}
                </div>
            </Row>

        </Container>
    );
}
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.instanceOf(Date).isRequired,
        FavoriteMovies: PropTypes.array
        })
};