import React from 'react';
import PropTypes from 'prop-types';

const Success = (props) => {
    return (
        <div className="alert alert-success" role="alert">
            {props.children}
        </div>
    );
};

export default Success;
