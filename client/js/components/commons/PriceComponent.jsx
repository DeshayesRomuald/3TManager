import React from 'react';
import PropTypes from 'prop-types';
import accounting from 'accounting';

const Price = (props) => {
    const formatOptions = {
        precision: 2,
        thousand: ',',
        decimal: '.',
        symbol: '€',
        format: '%v%s'
    };

    if (!props.value) {
        return null;
    }

    return <span>{accounting.formatMoney(props.value, formatOptions)}</span>;
};

Price.propTypes = {
    value: PropTypes.number
};

export default Price;
