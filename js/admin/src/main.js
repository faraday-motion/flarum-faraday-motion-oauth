import app from 'flarum/app';

import FaradayMotionSettingsModal from 'flarum/auth/faraday-motion/components/FaradayMotionSettingsModal';

app.initializers.add('flarum-auth-faraday-motion', () => {
	app.extensionSettings['faraday-motion-faraday-motion-oauth'] = () => app.modal.show(new FaradayMotionSettingsModal());
});