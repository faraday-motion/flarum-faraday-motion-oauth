<?php 

namespace  Flarum\Auth\FaradayMotion\Provider;

//TODO: Port this one.
use Flarum\Auth\FaradayMotion\Provider\Exception\FaradayMotionIdentityProviderException;
use League\OAuth2\Client\Token\AccessToken;
use League\OAuth2\Client\Tool\BearerAuthorizationTrait;
use Psr\Http\Message\ResponseInterface;

class FaradayMotion extends AbstractProvider
{
	use BearerAuthorizationTrait;

	/**
	 * Domain
	 * @var  string
	 */
	public $domain = 'http://localhost:4848'; // TODO:: Export this to an env var.

	/**
	 * Api domain
	 *
	 * @var  string
	 */
	public $apiDomain = 'http://localhost:4848'; // TODO:: See if we need this at all.

	/**
	 * Get authorization url to begin OAuth flow
	 *
	 * @return  string
	 */
	public function getBaseAuthorizationUrl()
	{
		return $this->domain.'/login/oauth/authorize';
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
		if ($this->domain === 'http://localhost:4848') {
			return $this->apiDomain.'user';
		}

		return $this->domain.'api/v1/user';
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
}
