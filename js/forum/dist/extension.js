'use strict';

System.register('flarum/auth/faraday-motion/main', ['flarum/extend', 'flarum/app', 'flarum/components/LogInButtons', 'flarum/components/LogInButton', 'flarum/components/HeaderSecondary', 'flarum/components/SettingsPage', 'flarum/components/LogInModal'], function (_export, _context) {
  "use strict";

  var extend, app, LogInButtons, LogInButton, HeaderSecondary, SettingsPage, LogInModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_flarumComponentsLogInButton) {
      LogInButton = _flarumComponentsLogInButton.default;
    }, function (_flarumComponentsHeaderSecondary) {
      HeaderSecondary = _flarumComponentsHeaderSecondary.default;
    }, function (_flarumComponentsSettingsPage) {
      SettingsPage = _flarumComponentsSettingsPage.default;
    }, function (_flarumComponentsLogInModal) {
      LogInModal = _flarumComponentsLogInModal.default;
    }],
    execute: function () {

      app.initializers.add('flarum-auth-faraday-motion', function () {

        // Add the Faraday Motion Login
        extend(LogInButtons.prototype, 'items', function (items) {
          items.add('faraday-motion', m(
            LogInButton,
            {
              className: 'Button LogInButton--faraday-motion',
              icon: 'user-circle-o',
              width: '700',
              path: '/auth/faraday-motion' },
            'Faraday Motion Account'
          ));
          console.log(items);
        });

        //Remove Sign Up button
        extend(HeaderSecondary.prototype, 'items', removeSignUpButton);

        function removeSignUpButton(items) {
          if (!items.has('signUp')) {
            return;
          }
          items.remove('signUp');
        }

        // // Remove the default login button
        extend(LogInModal.prototype, 'content', removeLoginForm);

        function removeLoginForm() {
          this.content = function () {
            return [m(
              'div',
              { className: 'Modal-body' },
              m(LogInButtons, null)
            ), m(
              'div',
              { className: 'Modal-footer' },
              m(
                'p',
                null,
                '  '
              )
            )];
          };
        }
      });
    }
  };
});