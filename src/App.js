import React, { Component } from 'react';
// import { Redirect, Route, Router } from 'react-router-dom';
import Maps from './components/Maps';
import Contacts from './components/Contacts/Contacts';
import Auth from './firebase/firebase';
import * as firebase from 'firebase';
import 'firebase/database';

const auth = new Auth();

class App extends Component {
  constructor(){
    super()
    this.state = {
      lat: 0,
      lng: 0
    }
    const database = firebase.database();
    firebase.database().ref('users/' + 22).set({
      username: "einar",
      email: "einar@",
      lat: this.state.lat,
      lng: this.state.lng,
    });
  }

  componentDidMount(){
    navigator.geolocation.watchPosition(p =>{
      let d = new Date();
      
      this.setState({
        lat: p.coords.latitude,
        lng: p.coords.longitude
      })
      console.log(p)

      firebase.database().ref("/users/22").update({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
        // test: ["hææ", "bæjo"],
      })

      firebase.database().ref("/users/22/history").push({
        time: d.getTime(),
        lat: p.coords.latitude,
        lng: p.coords.longitude
      })
    })

    navigator.serviceWorker.register('../sw.js')
    .then(function(registration) {
      console.log('The service worker has been registered ', registration);
    });
  }



  render() {
    return (
      <div className="App">

      {this.state.lat === 0 ? null :
        <Maps 
          lat = {this.state.lat}
          lng = {this.state.lng}
          isMarkerShown
          // googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTcaCpwGdxHbSxX6fxzy_bzqqy6mVK31Q&v=3"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />} />
        }
        <button onClick={()=>auth.fbLogin()}>Login with facebook</button>
        <button onClick={() =>auth.logOut()}>Log out</button>
      </div>
    );
  }
}

export default App;

