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
      imgUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height); 
    console.log(width , height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)

      }
    }

    displayFaceBox = (box) =>{
      console.log(box);
      
      this.setState({box: box});
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
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response))) 
    .catch(err => console.log(err));
    
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
       <FaceRecognition box = {this.state.box} imgUrl = {this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
