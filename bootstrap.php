<?php


use Flarum\Auth\FaradayMotion\Listener;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
	$events->subscribe(Listener\AddClientAssets::class);
	$events->subscribe(Listener\AddFaradayMotionAuthRoute::class);
	$events->subscribe(Listener\AddApiAttributes::class);
	$events->subscribe(Listener\LogoutUser::class);
};