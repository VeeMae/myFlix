import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import './director-view.scss';

export class DirectorView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {

        const { director } = this.props;

        return (

            <Container className="director-view">
                <h2>Director Info</h2>
                <Row className='director-row'>

                    <Card className='director-card'>

                        <Card.Body>
                            <Card.Text>
                                <span className="label">Name: </span>
                                {director.Name}
                                <br />
                                <span className="label">Born: </span>
                                {director.Birth}
                                <br/>
                                <span className="label">Bio: </span>
                                {director.Bio}
                            </Card.Text>
                        </Card.Body>

                    </Card>
                </Row>

                <Row className='director-btn'>
                     <Link to='/'>
                        <Button variant='light' className='director-home-btn'>Home</Button>
                    </Link>
                </Row>


            </Container>
        );

    }
}

DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
        })
};