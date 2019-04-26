import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Ranks from './components/Ranks/Ranks';

import './App.css';


const app = new Clarifai.App({
  apiKey: '7c834bb02f7b46cb9f959c4abcea3237'
 });
const particleOptions = {
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
  constructor(){
    super();
    this.state = {
      input: '',
      imgUrl: ''
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
    
  }
  onButtonSubmit = () =>{
    this.setState({imgUrl: this.state.input})
    app.models
    .predict(
       Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[1].region_info.bounding_box);
        
      },
      function(err) {
        // there was an error 
      }
  );
    
  }
  render() {
   
    return (
      <div className="App">
      <Particles className='particles' 
        params={particleOptions}
    />      
        <Navigation/>   
        <Logo/>
        <Ranks/>
       <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>
       <FaceRecognition imgUrl = {this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
