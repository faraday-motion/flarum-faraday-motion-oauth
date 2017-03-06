import LinkButton from 'flarum/components/LinkButton';

export default class FaradayMotionSignUpButton extends LinkButton {
	view() {
		const link = this.props.link;
		var registerUrl = app.forum.attribute("oauthUrl") + "/register" + "/?origin=" + app.forum.attribute('baseUrl');
		return (
			<a 
			   className="LinksButton Button Button--link"
			   href= {registerUrl}
			   title="Sign Up"
			>
			Sign Up
			</a>
		);
	}
}