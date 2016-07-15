// comment
var Comment = React.createClass({
  render: function() {
    var md = new Remarkable();
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children} 
        <hr />
        markdown: <br />
        {md.render(this.props.children.toString())}
        <hr />
        
      </div>
    );
  }
});

// commentList
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    
    // special use todo callback. will pass object to parent event handler
    this.props.onCommentSubmit({author: author, text: text}); 
    
    // TODO: send request to the server
    console.log("TODO: send request to the server.");
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div>
          Hello, world! I am a CommentForm.
        </div>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});


// CommentBox
var CommentBox = React.createClass({
  handleCommentSubmit: function(comment) {
    // TODO: CommentForm component submit to the server and need refresh the list here.
    console.log("TODO: CommentForm component submit to the server and need refresh the list here.");
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments Box</h1>
        <CommentList data={this.state.data}  />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});


// tutorial1.js
ReactDOM.render(
  <CommentBox url="api/comments.json" pollInterval={5000} />,
  document.getElementById('content')
);
