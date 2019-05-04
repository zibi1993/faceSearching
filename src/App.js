import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      box: {},
      route: 'signin',
      isSignedIn: false
     
    } 
  }

  componentDidMount(){
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(data => console.log(data))
    
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height); 
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

      }
    }

    displayFaceBox = (box) => {
      this.setState({box: box});
    }
  onInputChange = (event) => { 
    this.setState({input: event.target.value});
    
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

  onRouteChange = (route) =>{
    if ( route === 'signout'){
      this.setState({isSignedIn: false})
    }else if ( route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route}); 
  }
  render() {
   const { isSignedIn, imgUrl, route, box } = this.state;
    return (
      <div className="App">
      <Particles className='particles' 
        params={particleOptions}
    />       
        <Navigation isSignedIn ={isSignedIn} onRouteChange = {this.onRouteChange}/>   
        {route === 'home'
          ? <div>
            <Logo/>
            <Ranks/>
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box = {box} imgUrl = {imgUrl}/>
            </div>          
            :(
              route === 'signin'
              ? <Signin onRouteChange = {this.onRouteChange}/>
              : <Register onRouteChange = {this.onRouteChange}/>
            )
          
        }

      </div>
    );
  }
}

export default App;
 