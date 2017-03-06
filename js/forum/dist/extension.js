"use strict";

System.register("flarum/auth/faraday-motion/components/FaradayMotionSignUpButton", ["flarum/components/LinkButton"], function (_export, _context) {
	"use strict";

	var LinkButton, FaradayMotionSignUpButton;
	return {
		setters: [function (_flarumComponentsLinkButton) {
			LinkButton = _flarumComponentsLinkButton.default;
		}],
		execute: function () {
			FaradayMotionSignUpButton = function (_LinkButton) {
				babelHelpers.inherits(FaradayMotionSignUpButton, _LinkButton);

				function FaradayMotionSignUpButton() {
					babelHelpers.classCallCheck(this, FaradayMotionSignUpButton);
					return babelHelpers.possibleConstructorReturn(this, (FaradayMotionSignUpButton.__proto__ || Object.getPrototypeOf(FaradayMotionSignUpButton)).apply(this, arguments));
				}

				babelHelpers.createClass(FaradayMotionSignUpButton, [{
					key: "view",
					value: function view() {
						var link = this.props.link;
						var registerUrl = app.forum.attribute("oauthUrl") + "/register" + "/?origin=" + app.forum.attribute('baseUrl');
						return m(
							"a",
							{
								className: "LinksButton Button Button--link",
								href: registerUrl,
								title: "Sign Up"
							},
							"Sign Up"
						);
					}
				}]);
				return FaradayMotionSignUpButton;
			}(LinkButton);

			_export("default", FaradayMotionSignUpButton);
		}
	};
});;
'use strict';

System.register('flarum/auth/faraday-motion/main', ['flarum/extend', 'flarum/app', 'flarum/components/LogInButtons', 'flarum/components/LogInButton', 'flarum/components/HeaderSecondary', 'flarum/components/SettingsPage', 'flarum/components/LogInModal', 'flarum/components/SignUpModal', 'flarum/auth/faraday-motion/components/FaradayMotionSignUpButton'], function (_export, _context) {
  "use strict";

  var extend, app, LogInButtons, LogInButton, HeaderSecondary, SettingsPage, LogInModal, SignUpModal, FaradayMotionSignUpButton;
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
    }, function (_flarumComponentsSignUpModal) {
      SignUpModal = _flarumComponentsSignUpModal.default;
    }, function (_flarumAuthFaradayMotionComponentsFaradayMotionSignUpButton) {
      FaradayMotionSignUpButton = _flarumAuthFaradayMotionComponentsFaradayMotionSignUpButton.default;
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
            'Login with Faraday Motion'
          ));
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
          if (!items.has('signUp')) {
            return;
          }
          items.remove('signUp');
          items.add('signUp', FaradayMotionSignUpButton.component({}), 1);
        }

        function removeLoginForm() {
          this.content = function () {
            return [m(
              'div',
              { className: 'Modal-body' },
              m(LogInButtons, null)
            ), m('div', { className: 'Modal-footer' })];
          };
        }

        function removeProfileActions(items) {
          items.remove('changeEmail');
          items.remove('changePassword');
        }
      }); // End app initializer function.


      // Ugly.. very ugly..
      $(document).ready(function () {

        $.urlParam = function (name) {
          var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
          if (results == null) {
            return null;
          } else {
            return results[1] || 0;
          }
        };

        if ($.urlParam('register') === 'ok') {
          $('li.item-logIn button').click();
        }
      });
    }
  };
});