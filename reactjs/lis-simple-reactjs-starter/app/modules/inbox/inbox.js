var React = window.React;

window.Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

window.Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})