import React from 'react';

const FaceRecognition = ({imgUrl}) =>{
    return (
        <div className='center ma'>
            <div className='absolulte mt2'>
                <img alt='img' src={imgUrl} widht='500px' height='auto'/>
            </div>
        </div>
    )
}
export default FaceRecognition;