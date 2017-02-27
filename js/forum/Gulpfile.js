var gulp = require('flarum-gulp');

gulp({
	modules: {
		'flarum/auth/faraday-motion': 'src/**/*.js'
	}
})