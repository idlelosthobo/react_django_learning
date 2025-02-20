class WelcomeBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Jay',
      appVersion: '3'
    }
  }

  render() {
    return (
      <>
        <h2>Hello {this.state.name || 'Friend'}! Welcome Back.</h2>
        {
          this.state.appVersion && this.state.appVersion < 2
            ? <p>Your app is out of date. Please download the new version and take a look at all the new features.</p>
            : ''
        }
        <CoolButton customText={this.state.appVersion && this.state.appVersion < 2 ? 'Download v2' : 'Download'}/>
      </>
    )
  }


}
