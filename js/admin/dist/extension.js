'use strict';

System.register('flarum/auth/faraday-motion/components/FaradayMotionSettingsModal', ['flarum/components/SettingsModal'], function (_export, _context) {
	"use strict";

	var SettingsModal, FaradayMotionSettingsModal;
	return {
		setters: [function (_flarumComponentsSettingsModal) {
			SettingsModal = _flarumComponentsSettingsModal.default;
		}],
		execute: function () {
			FaradayMotionSettingsModal = function (_SettingsModal) {
				babelHelpers.inherits(FaradayMotionSettingsModal, _SettingsModal);

				function FaradayMotionSettingsModal() {
					babelHelpers.classCallCheck(this, FaradayMotionSettingsModal);
					return babelHelpers.possibleConstructorReturn(this, (FaradayMotionSettingsModal.__proto__ || Object.getPrototypeOf(FaradayMotionSettingsModal)).apply(this, arguments));
				}

				babelHelpers.createClass(FaradayMotionSettingsModal, [{
					key: 'className',
					value: function className() {
						return 'FaradayMotionSettingsModal Modal--small';
					}
				}, {
					key: 'title',
					value: function title() {
						return "oAuth 2 Server Config";
						//return app.translator.trans('flarum-auth-faraday-motion.admin.faraday_motion_settings.title');
					}
				}, {
					key: 'form',
					value: function form() {
						return [m(
							'div',
							{ className: 'Form-group' },
							m(
								'label',
								null,
								'oAuth Url'
							),
							m('input', { className: 'FormControl', bidi: this.setting('flarum-auth-faraday-motion.oauth_url') })
						), m(
							'div',
							{ className: 'Form-group' },
							m(
								'label',
								null,
								'oAuth API Url'
							),
							m('input', { className: 'FormControl', bidi: this.setting('flarum-auth-faraday-motion.oauth_api_url') })
						), m(
							'div',
							{ className: 'Form-group' },
							m(
								'label',
								null,
								'Client Ids'
							),
							m('input', { className: 'FormControl', bidi: this.setting('flarum-auth-faraday-motion.client_id') })
						), m(
							'div',
							{ className: 'Form-group' },
							m(
								'label',
								null,
								'Client Secret'
							),
							m('input', { className: 'FormControl', bidi: this.setting('flarum-auth-faraday-motion.client_secret') })
						)];
					}
				}]);
				return FaradayMotionSettingsModal;
			}(SettingsModal);

			_export('default', FaradayMotionSettingsModal);
		}
	};
});;
'use strict';

System.register('flarum/auth/faraday-motion/main', ['flarum/app', 'flarum/auth/faraday-motion/components/FaradayMotionSettingsModal'], function (_export, _context) {
	"use strict";

	var app, FaradayMotionSettingsModal;
	return {
		setters: [function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_flarumAuthFaradayMotionComponentsFaradayMotionSettingsModal) {
			FaradayMotionSettingsModal = _flarumAuthFaradayMotionComponentsFaradayMotionSettingsModal.default;
		}],
		execute: function () {

			app.initializers.add('flarum-auth-faraday-motion', function () {
				app.extensionSettings['faraday-motion-faraday-motion-oauth'] = function () {
					return app.modal.show(new FaradayMotionSettingsModal());
				};
			});
		}
	};
});