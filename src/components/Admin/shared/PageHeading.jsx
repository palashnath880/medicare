import React from 'react';

const PageHeading = ({ children }) => {
    return (
        <div className='pb-2 px-3 border-b border-primary'>
            <h1 className='text-3xl text-primary font-semibold'>{children}</h1>
        </div>
    );
}

export default PageHeading;
