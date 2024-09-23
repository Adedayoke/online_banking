import React from 'react';
// import logoLg from '../assets/logo large2.png'

const Logo = ({extraClass = "", imageSrc}) => {
    return (
        <img className={` ${extraClass}`} src={imageSrc}/>

    );
}

export default Logo;
