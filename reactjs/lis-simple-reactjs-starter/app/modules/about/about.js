var React = window.React;

window.About = React.createClass({
  render() {
    return (
            <div>
            <h3>About</h3>
            {this.props.myprop}
            </div>
            )
  }
})
