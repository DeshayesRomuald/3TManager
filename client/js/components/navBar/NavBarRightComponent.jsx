import React from 'react';

const NavBarRight = (props) => {
    return (<ul className="nav navbar-nav navbar-right">
        {props.children}
    </ul>);
};

export default NavBarRight;

