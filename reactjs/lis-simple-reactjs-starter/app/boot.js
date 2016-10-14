//import { Router, Route, Link } from 'react-router'
var React = window.React;
var ReactDOM = window.ReactDOM;
var ReactRouter = window.ReactRouter;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;

ReactDOM.render((
  <Router>
      <Route path="/" component={App}>
            {/* Show the dashboard at / */}
            <IndexRoute component={Dashboard} />
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox}>
                <Route path="messages/:id" component={Message} />
            </Route>
      </Route>
  </Router>
), document.getElementById('container'));