import React from 'react';

const NavBarLeft = (props) => {
    return (<ul className="nav navbar-nav">
        {props.children}
    </ul>);
};

export default NavBarLeft;

