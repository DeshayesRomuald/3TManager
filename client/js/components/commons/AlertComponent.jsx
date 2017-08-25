import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
    return (
        <div className="alert alert-danger" role="alert">
            {props.children}
        </div>
    );
};

export default Alert;
