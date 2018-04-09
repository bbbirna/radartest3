import * as firebase from 'firebase';
import 'firebase/database';
import {config} from './firebase-config';
require("firebase/auth");


export default class Auth{
    constructor(){
        const app = firebase.initializeApp( config );
        this.fbLogin = this.fbLogin.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    fbLogin(){
        console.log("jeeee");
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.setCustomParameters({
          'display': 'popup'
        });
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider)
          .then(function(result) {
            const token = result.credential.accessToken;
            const user = result.user;
            console.log(user);
            console.log(user.email)
            // console.log(result.additionalUserInfo.isNewUser);
        }).catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log("user is signed in")
          } else {
            console.log("user is Logged out")
          }
        });
      }
    
      logOut(){
        firebase.auth().signOut();
      }
}