import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Ranks from './components/Ranks/Ranks';
import './App.css';


const particleOptions={
      particles: {
        number: {
            value: 300,
            density: {
                enable: true,
                value_area: 1803.4120608655228
            }
        }
    },
    interactivity: {
      detect_on: 'window',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: false,
                mode: 'push'
            },
            resize: true
        }
      }
    }

       
    
class App extends Component {
  render() {
    return (
      <div className="App">
      <Particles className='particles' 
        params={particleOptions

        }
    />      
        <Navigation/>   
        <Logo/>
        <Ranks/>
       <ImageLinkForm/>
      
       {/* <FaceRecognition/>
       */} 
      </div>
    );
  }
}

export default App;
