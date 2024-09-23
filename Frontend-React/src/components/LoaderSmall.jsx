import React from 'react';

const LoaderSmall = ({extraClass}) => {
    return (
        <div className={`w-[20px] h-[20px] rounded-full border-r-0 border border-secondary animate-spin ${extraClass}`}>
            
        </div>
    );
}

export default LoaderSmall;
