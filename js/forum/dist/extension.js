'use strict';

System.register('flarum/auth/faraday-motion/main', ['flarum/extend', 'flarum/app', 'flarum/components/LogInButtons', 'flarum/components/LogInButton'], function (_export, _context) {
  "use strict";

  var extend, app, LogInButtons, LogInButton;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_flarumComponentsLogInButton) {
      LogInButton = _flarumComponentsLogInButton.default;
    }],
    execute: function () {

      app.initializers.add('flarum-auth-faraday-motion', function () {
        extend(LogInButtons.prototype, 'items', function (items) {
          items.add('faraday-motion', m(
            LogInButton,
            {
              className: 'Button LogInButton--faraday-motion',
              icon: 'star',
              path: '/auth/faraday-motion' },
            'Log In With Faraday Motion Account'
          ));
        });
      });
    }
  };
});