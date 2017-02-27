<?php 

namespace Flarum\Auth\FaradayMotion\Listener;

use Flarum\Event\ConfigureForumRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddFaradayMotionAuthRoute
{
	/**
	 * @param Dispatcher $events
	 */
	public function subscribe(Dispatcher $events)
	{
		$events->listen(ConfigureForumRoutes::class, [$this, 'configureForumRoutes']);
	}

	/**
	 * @param  ConfigureForumRoutes $event
	 */
	public function configureForumRoutes(ConfigureForumRoutes $event)
	{
		$event->get('/auth/faraday-motion', 'auth.faraday-motion', 'Flarum\Auth\FaradayMotion\FaradayMotionAuthController');
	}
}