import React from 'react';

const Ranks = ({name, entries}) => {
    return(
        <div>
            <div className='white f3'>
            {`${name}, aktualna libcza wpisow to ... `}
            </div>
            <div className='white f1'>
            {entries}
            </div>
        </div>
    );
}
export default Ranks;
