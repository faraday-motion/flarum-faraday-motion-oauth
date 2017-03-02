<?php 

namespace Flarum\Auth\FaradayMotion;

use Flarum\Forum\AuthenticationResponseFactory;
use Flarum\Forum\Controller\AbstractOAuth2Controller;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Auth\FaradayMotion\Provider\FaradayMotion;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

class FaradayMotionAuthController extends AbstractOAuth2Controller
{
	/**
	 * @var  SettingsRepositoryInterface
	 */
	protected $settings;

	/**
	 * @param AuthenticationResponseFactory $authResponse
	 * @param SettingsRepositoryInterface $settings
	 */
	public function __construct(AuthenticationResponseFactory $authResponse, SettingsRepositoryInterface $settings)
	{
		$this->settings = $settings;
		$this->authResponse = $authResponse;
	}

	/**
	 * {@inheritdoc}
	 */
	protected function getProvider($redirectUri)
	{
		return new FaradayMotion([
			'clientId' 	=> $this->settings->get('flarum-auth-faraday-motion.client_id'),
			'clientSecret' => $this->settings->get('flarum-auth-faraday-motion.client_secret'),
			'redirectUri'	=> $redirectUri
		]);
	}

	/**
	 * {@inheritdoc}
	 */
	protected function getAuthorizationUrlOptions()
	{
		//return ['scope' => ['user:email']]; // this is default for GitHub TODO: See if we need that.
		return ['scope' => ''];
	}

	/**
     * {@inheritdoc}
     */
    protected function getIdentification(ResourceOwnerInterface $resourceOwner)
    {
        return [
            'email' => $resourceOwner->getEmail() ?: $this->getEmailFromApi()
        ];
    }

	/**
	 * {@inheritdoc}
	 */
	protected function getSuggestions(ResourceOwnerInterface $resourceOwner)
	{
		// TODO: Find out what resources are we going to import from the Faraday Motion Account.
		return [
			'username' 	 => $resourceOwner->getNickname(),
			'avatar_url' => $this->provider->domain . array_get($resourceOwner->toArray(), 'avatar'),
			'bio'		 => $resourceOwner->getAbout()
		];
		return [];
	}

	protected function getEmailFromApi()
	{
		$url = $this->provider->apiDomain.'/user/emails'; //TODO: Find what is our endpoint for this.

		$emails = $this->provider->getResponse(
			$this->provider->getAuthenticatedRequest('GET', $url, $this->token)
		);

		foreach ($emails as $email){
			if ($email['primary'] && $email['verified']) {
				return $email['email'];
			}
		}
	}
}
