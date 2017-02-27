import SettingsModal from 'flarum/components/SettingsModal'; 

export default class FaradayMotionSettingsModal extends SettingsModal {
	className() {
		return 'FaradayMotionSettingsModal Modal--small';
	}

	title() {
		return "FM Login";
		//return app.translator.trans('flarum-auth-faraday-motion.admin.faraday_motion_settings.title');
	}
	// TODO:: Add translations to tiles here if ever required.
	form() {
		return [
		  <div className="Form-group">
		    <label>Client Id</label>
		    <input className="FormControl" bidi={this.setting('flarum-auth-faraday-motion.client_id')} />
		  </div>, 

		  <div className="Form-group">
		    <label>Client Secret</label>
		    <input className="FormControl" bidi={this.setting('flarum-auth-faraday-motion.client_secret')}/>
		  </div>
		];
	}
}
