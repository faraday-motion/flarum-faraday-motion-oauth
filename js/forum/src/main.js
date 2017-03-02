import { extend } from 'flarum/extend';
import app from 'flarum/app';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';
import HeaderSecondary from "flarum/components/HeaderSecondary";
import SettingsPage from "flarum/components/SettingsPage";
import LogInModal from "flarum/components/LogInModal";

app.initializers.add('flarum-auth-faraday-motion', () => {
  
  // Add the Faraday Motion Login
  extend(LogInButtons.prototype, 'items', function(items) {
  	items.add('faraday-motion', 
  	  <LogInButton
  	    className="Button LogInButton--faraday-motion"
  	    icon="user-circle-o"
        width="700"
  	    path="/auth/faraday-motion">
  	   Faraday Motion Account
  	  </LogInButton>
  	);
    console.log(items);
  });

  //Remove Sign Up button
  extend(HeaderSecondary.prototype, 'items', removeSignUpButton);

 function removeSignUpButton(items) {
    if(!items.has('signUp')) {
      return;
    }
    items.remove('signUp');
  }

  // // Remove the default login button
  extend(LogInModal.prototype, 'content', removeLoginForm);

  function removeLoginForm(){
    this.content = function() {
      return [
          <div className="Modal-body">
            <LogInButtons/>
          </div>,
          <div className="Modal-footer">
            <p>  </p>
          </div>
      ];
    }
  } 

});

