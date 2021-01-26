import React from 'react';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';

import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
    }

    if (!movies) return <div className='main-view' />;

    return <div className='movies-list'>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />

        <Container>

            <Row className='moviesList-row'>
                 {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
            </Row>

        </Container>

    </div>;

}

export default connect(mapStateToProps)(MoviesList);