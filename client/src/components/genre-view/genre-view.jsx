import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {

        const { genre } = this.props;

        return (

            <Container className="genre-view">
                <h2>Genre Info</h2>
                <Row className='genre-row'>

                    <Card className='genreCard'>

                        <Card.Body>
                            <Card.Text>
                                <span className="label">Genre: </span>
                                {genre.Name}
                                <br />
                                <span className="label">Description: </span>
                                {genre.Description}
                            </Card.Text>
                        </Card.Body>

                    </Card>
                </Row>

                <Row className='genre-btn'>
                    <Link to='/'>
                        <Button variant='light' className='genre-home-button'>Home</Button>
                    </Link>

                </Row>
            </Container>
        );

    }
}

GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    })
};