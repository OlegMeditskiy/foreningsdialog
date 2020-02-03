import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from './pages/MainPage';

class App extends React.Component {
    render() {
      return (
          <Router>
              <Switch>
                  <Route exact path="/" component={LoginPage}/>
                  <Route exact path="/main" component={MainPage}/>
              </Switch>
          </Router>
      )
    }
}
export default App;
