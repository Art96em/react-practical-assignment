import React from 'react';

export default ({ name, clicked, ...restProps }) => {
    return <div className={clicked ? 'clicked' : ''} {...restProps}>{name}</div>;
}