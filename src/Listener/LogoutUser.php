<?php 

namespace Flarum\Auth\FaradayMotion\Listener;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\UserLoggedOut;
use Flarum\Settings\SettingsRepositoryInterface;
use Zend\Diactoros\Response\RedirectResponse;
use Flarum\Foundation\Application;

class LogoutUser {
	/**
	 * @var  SettingsRepositoryInterface
	 */
	protected $settings;
	/**
	 * @var Flarum\Foundation\Application
	 */
	protected $app;

	/**
	 * @param SettingsRepositoryInterface
	 */
	public function __construct (SettingsRepositoryInterface $settings, Application $app)
	{
		$this->settings = $settings;
		$this->app = $app;

	}

	public function subscribe (Dispatcher $events)
	{
		$events->listen(UserLoggedOut::class, [$this, 'logUserOutOfoAuthServer']);
	}

	public function logUserOutOfoAuthServer (UserLoggedOut $user)
	{
		header("Location: " . $this->settings->get('flarum-auth-faraday-motion.oauth_url') . "/auth/logout/global" . "/?origin=" . $this->app->config('url') ); /* Redirect browser */
		exit();
	}
}