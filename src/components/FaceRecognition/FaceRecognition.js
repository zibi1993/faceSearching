import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imgUrl, box}) =>{
    return (
        <div className='center ma'>
            <div className='absolulte mt2'>
                <img id = 'inputimage'alt='img' src={imgUrl} widht='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol , bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>
        </div>
    )
}
export default FaceRecognition;