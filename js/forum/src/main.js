import { extend } from 'flarum/extend';
import app from 'flarum/app';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';
import HeaderSecondary from "flarum/components/HeaderSecondary";
import SettingsPage from "flarum/components/SettingsPage";
import LogInModal from "flarum/components/LogInModal";
import SignUpModal from "flarum/components/SignUpModal";
import FaradayMotionSignUpButton from 'flarum/auth/faraday-motion/components/FaradayMotionSignUpButton';


app.initializers.add('flarum-auth-faraday-motion', () => {
  
  // Add the Faraday Motion Login
  extend(LogInButtons.prototype, 'items', function(items) {
  	items.add('faraday-motion', 
  	  <LogInButton
  	    className="Button LogInButton--faraday-motion"
  	    icon="user-circle-o"
        width="700"
  	    path="/auth/faraday-motion">
  	   Login with Faraday Motion
  	  </LogInButton>
  	);
   
  });

 //Remove Sign Up button
 extend(HeaderSecondary.prototype, 'items', removeSignUpButton);
 // Remove the default login button
 extend(LogInModal.prototype, 'content', removeLoginForm);
 // Remove settings actions for chaning passowrd and email 
 extend(SettingsPage.prototype, 'accountItems', removeProfileActions);
 // TODO:: There's an issue with the time when the function is overriden
 // Edit the Sign Up Modal
 // extend(SignUpModal.prototype, 'content', editSignUpModal);

 function removeSignUpButton(items) {
    if(!items.has('signUp')) {
      return;
    }
    items.remove('signUp');
    items.add('signUp', FaradayMotionSignUpButton.component({}), 1);
 }

  function removeLoginForm(){
    // this.content = function() {
    //   return [
    //       <div className="Modal-body">
    //         <LogInButtons/>
    //       </div>,
    //       <div className="Modal-footer">
    //       </div>
    //   ];
    // }
  } 

  function removeProfileActions(items) {
    items.remove('changeEmail');
    items.remove('changePassword');
  }

});  // End app initializer function.


// Ugly.. very ugly..
$( document ).ready(function() {

  $.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
      return null;
    }else{
      return results[1] || 0;
    } 
  }

  if ($.urlParam('register') === 'ok') {
     $('li.item-logIn button').click();
  }
    
});