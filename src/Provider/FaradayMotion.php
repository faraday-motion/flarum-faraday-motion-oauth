<?php 

namespace Flarum\Auth\FaradayMotion\Provider;

use League\OAuth2\Client\Provider\AbstractProvider;
use League\OAuth2\Client\Token\AccessToken;
use League\OAuth2\Client\Tool\BearerAuthorizationTrait;
use Flarum\Auth\FaradayMotion\Provider\FaradayMotionResourceOwner;
use Flarum\Auth\FaradayMotion\Provider\Exception\FaradayMotionIdentityProviderException;
use Psr\Http\Message\ResponseInterface;
use Flarum\Settings\SettingsRepositoryInterface;

class FaradayMotion extends AbstractProvider
{
	use BearerAuthorizationTrait;


	protected $settings; 

	/**
	 * Domain
	 * @var  string
	 */

	public $domain;

	/**
	 * Api domain
	 *
	 * @var  string
	 */

	public $apiDomain;

	/**
	 * Get authorization url to begin OAuth flow
	 *
	 * @return  string
	 */
	public function getBaseAuthorizationUrl()
	{
		return $this->domain.'/oauth/authorize';
	}


    /**
     * Get access token url to retrieve token
     *
     * @param  array $params
     *
     * @return string
     */
    public function getBaseAccessTokenUrl(array $params)
    {
       return $this->domain.'/oauth/token';
    }

	/**
	 * Get access token url to retrieve token
	 *
	 * @param array $params
	 *
	 * @return string
	 */
	public function getResourceOwnerDetailsUrl(AccessToken $token)
	{
		return $this->apiDomain.'/user';
	}

	/**
	 * Get the default scopes used by this provider.
	 *
	 * This should not be a complete list of all scopes, but the minimum
	 * required for the provider user interface!
	 *
	 * @return  array 
	 */
	protected function getDefaultScopes()
	{
		return [];	
	}

	/**
	 * Check a provider response for errors.
	 * 
     * @link   https://developer.github.com/v3/#client-errors
     * @link   https://developer.github.com/v3/oauth/#common-errors-for-the-access-token-request
     * @throws IdentityProviderException
     * @param  ResponseInterface $response
     * @param  string $data Parsed response data
     * @return void
	 */
	protected function checkResponse(ResponseInterface $response, $data)
	{
		if ($response->getStatusCode() >= 400) {
			throw FaradayMotionIdentityProviderException::clientException($responce, $data);
		} elseif (isset($data['error'])) {
			throw FaradayMotionIdentityProviderException::oauthException($response, $data);
		}
	}

	/**
	 * Generate a user object from a succesful user details request.
	 *
	 * @param  array $response
	 * @param  AccessToken $token
	 * @return League\OAuth2\Client\Provider\ResourceOwnerInterface
	 */
	protected function createResourceOwner(array $response, AccessToken $token)
	{
		$user = new FaradayMotionResourceOwner($response);

		return $user->setDomain($this->domain);
	}


	public function getAccessToken($grant = 'password', array $params = [])
    {

        return parent::getAccessToken($grant, $params);
    }
}
