import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';

import Form from 'react-bootstrap/Form';

/**
 * Function to filter movies in the search field.
 * @param {*} props
 */
function VisibilityFilterInput(props) {
    return <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder='Search movies by name'
    />;
}

export default connect(null, { setFilter })(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
    visibilityFilter: PropTypes.string
}