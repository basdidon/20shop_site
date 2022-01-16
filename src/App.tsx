import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";
import './App.css';
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import FormExample from "./FormExample";
import Store from "./Store";
import Sale from "./Sale";
import ProductAbout from "./ProductAbout";

const App = (props:any) =>{

    return <div>
        <Router>
            <header>
                <div id={'navbar'}>
                    <div className={'nav-link'}><Link to="/">home</Link></div>
                    <div className={'nav-link'}><Link to="/product">product</Link></div>
                    <div className={'nav-link'}><Link to="/add_product">add product</Link></div>
                    <div className={'nav-link'}><Link to="/datatable">dataTable</Link></div>
                    <div className={'nav-link'}><Link to="/form_example">dataTable</Link></div>
                    <div className={'nav-link'}><Link to="/store">Store</Link></div>
                    <div className={'nav-link'}><Link to="/sale">Sale</Link></div>
                    <div className={'nav-link'}><Link to="/topics">Topics</Link></div>
                </div>
            </header>
            <div id={'container'}>
                <Switch>
                    <Route path="/form_example">
                        <FormExample />
                    </Route>
                    <Route path="/product">
                        <ProductAbout />
                    </Route>
                    <Route path="/add_product">
                        <AddProduct />
                    </Route>
                    <Route path="/datatable">
                        <ProductTable />
                    </Route>
                    <Route path="/store">
                        <Store />
                    </Route>
                    <Route path="/sale">
                        <Sale />
                    </Route>
                    <Route path="/topics">
                        <Topics />
                    </Route>
                    <Route path="/">
                        <h2>welcome</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
}


export default App;


function Topics() {
    let match = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>

            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let { topicId } :any= useParams();
    return (<h3>Requested topic ID: {topicId}</h3>);
}