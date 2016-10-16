var React = window.React;

window.Inbox = React.createClass({
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h2>Inbox</h2>
          </div>
        </div>
        <div className="row">
          
          <div className="col-sm-2">
            <h3>Mails:</h3>
            <ul>
              <li><a href="#/inbox/messages/1">messages 1</a></li>
              <li><a href="#/inbox/messages/2">messages 2</a></li>
              <li><a href="#/inbox/messages/3">messages 3</a></li>
              <li><a href="#/inbox/messages/4">messages 4</a></li>
              <li><a href="#/inbox/messages/5">messages 5</a></li>
            </ul>
          </div>
          <div className="col-sm-10">
            {this.props.children || "Welcome to your Inbox. Current Message is empty!"}
          </div>
          
          
        </div>
      </div>
    )
  }
})

window.Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})