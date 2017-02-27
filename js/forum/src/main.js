import { extend } from 'flarum/extend';
import app from 'flarum/app';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';

app.initializers.add('flarum-auth-faraday-motion', () => {
  extend(LogInButtons.prototype, 'items', function(items) {
  	items.add('faraday-motion', 
  	  <LogInButton
  	    className="Button LogInButton--faraday-motion"
  	    icon="star"
  	    path="/auth/faraday-motion">
  	    Log In With Faraday Motion Account
  	  </LogInButton>
  	);
  });
});