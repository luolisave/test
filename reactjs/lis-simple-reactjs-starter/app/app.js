var React = window.React;
var ReactRouter = window.ReactRouter;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

window.App = React.createClass({
  render() {
    return (
      <div>
        <div className="row">
            <div className="col-sm-4">
                <img className="img-responsive" src="assets/img/logo.png" />
            </div>
            <div className="col-sm-6">
                
            </div>
            <div className="col-sm-2">
                <span className="pull-right">Li's ReactJS Starter v0.0.1</span>
            </div>
        </div>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Home</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li><a href="#/inbox">Inbox</a></li>
                        <li><a href="#/about">About</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a className="cursor-pointer">
                                English
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
})