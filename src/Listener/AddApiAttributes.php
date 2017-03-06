<?php 

namespace Flarum\Auth\FaradayMotion\Listener;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class AddApiAttributes {
	/**
	 * @var  SettingsRepositoryInterface
	 */
	protected $settings;

	/**
	 * @param SettingsRepositoryInterface
	 */
	public function __construct (SettingsRepositoryInterface $settings)
	{
		$this->settings = $settings;
	}

	public function subscribe (Dispatcher $events)
	{
		$events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
	}

	public function prepareApiAttributes (PrepareApiAttributes $event)
	{
		if ($event->isSerializer(ForumSerializer::class)) {
			$event->attributes['oauthUrl'] = $this->settings->get('flarum-auth-faraday-motion.oauth_url');
			$event->attributes['oauthApiUrl'] = $this->settings->get('flarum-auth-faraday-motion.oauth_api_url');
		}
	}
}