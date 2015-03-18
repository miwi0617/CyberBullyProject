var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
        $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
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
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
   var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
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
	handleSubmit: function(e) {
    e.preventDefault();
    var answer1 = this.refs.answer1.getDOMNode().value.trim();
    var answer2 = this.refs.answer2.getDOMNode().value.trim();
    if (!answer2 || !answer1) {
      return;
    }
    this.props.onCommentSubmit({answer1: answer1, answer2: answer2});
    this.refs.answer1.getDOMNode().value = '';
    this.refs.answer2.getDOMNode().value = '';
  },
  render: function() {
  	
    return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
        <p> Is there any cyberaggressive behavior in the online posts? </p>
        <p> Mark yes if there is at least one negative word/comment and or content with intent to harm someone or others. </p>
        <input type="text" placeholder="answer yes/no" ref="answer1" />
        

        <p> Is there any cyerbullying in the online post?</p>
        <p>Mark yes if there are negative words and or comment with intent to harm someone or other, and the posts include two or more repeated negativity against a victim that cannot easily defend him or herself </p>
        <input type="radio" name='answer' value='yes' ref="answer2"/>Yes<br/>
        <input type="radio" name='answer' value='no' ref="answer2"/>No<br/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});


var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
  	var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});



React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);

