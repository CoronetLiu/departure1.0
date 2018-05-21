import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,browserHistory,IndexRoute,IndexRedirect,Redirect} from "react-router";
import store from './redux/store'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import Home from './components/home/Home';
import User from './components/home/User';
import Login from './components/home/Login';
import Join from './components/join/Join';
import Shoot from './components/join/Shoot';
import Monitor from './components/monitor/Monitor';
import Room from './components/monitor/Room';
import Cabinet from './components/monitor/Cabinet';
import MonitorDetail from './components/monitor/MonitorDetail';
import MonitorModify from './components/monitor/MonitorModify';
import Warn from './components/warn/Warn.js';
import DimensionMan from './components/setting/DimensionMan.js';
import MailSet from './components/setting/MailSet.js';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/home" component={Home}></Route>
                <IndexRedirect to='/home'/>
                <Route path="/user" component={User}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/join" component={Join}></Route>
                <Route path="/shoot" component={Shoot}></Route>
                <Route path="/room" component={Room}></Route>
                <Route path="/cabinet" component={Cabinet}></Route>
                <Route path="/monitor" component={Monitor}></Route>
                <Route path="/monitordetail" component={MonitorDetail}></Route>
                <Route path="/monitormodify" component={MonitorModify}></Route>
                <Route path="/warn" component={Warn}></Route>
                <Route path="/dimension" component={DimensionMan}></Route>
                <Route path="/mailset" component={MailSet}></Route>
                {/* <Route path="/mine" component={Mine}>
                        <Route path="/login" component={Login}></Route>
                    </Route>
                    <Route path="/detail/:id" component={Detail}></Route>*/}
                <Redirect from='*' to="/home"/>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
