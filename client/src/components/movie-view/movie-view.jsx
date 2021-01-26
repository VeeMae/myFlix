import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';

export class MovieView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    addFaveMovie(movie) {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        if (confirm('Add to list of Favorites?')) return (
        axios({
            method: 'put',
            url: `https://myflix-movie-application.herokuapp.com/users/${userName}/movies/${movie._id}`,
            headers: { Authorization: `Bearer ${token}` }
        })
                .then((response) => {
                    console.log(response);
            alert('You have added this movie to your list of Favorites.');
        })
    )
  }

    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (

            <Container className="movie-view">
                <h2>Movie Info</h2>

                <Row className='movie-row'>
                    <Col md={8} className='detail-col'>

                    <Card className='detailCard'>

                        <Card.Img variant='top' src={movie.ImagePath} />
                        <Card.Body>
                            <Card.Title as='h2'>{movie.Title}</Card.Title>
                            <Card.Text>
                                <span className="label">Description:  </span>
                                {movie.Description}
                                <br />
                                <span className="label">Genre: </span>
                                {movie.Genre.Name}
                                <br />
                                <span className="label">Director: </span>
                                {movie.Director.Name}
                            </Card.Text>
                        </Card.Body>

                        </Card>
                    </Col>


                    <Col md={4} className='btns'>

                    <Link to={`/movies/director/${movie.Director.Name}`}>
                        <Button className='director-btn' variant="info">Director Info</Button>
                    </Link>

                    <Link to={`/movies/genre/${movie.Genre.Name}`}>
                        <Button className='genre-btn' variant="info">Genre Info</Button>
                    </Link>

                    <Button variant='success' className='add-btn' onClick={() => this.addFaveMovie(movie)}>Add to Favorite Movies</Button>

                    <Link to='/'>
                        <Button className='movie-view-home-btn' variant='light'>Home</Button>
                    </Link>
                    </Col>

                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        })
    })
};