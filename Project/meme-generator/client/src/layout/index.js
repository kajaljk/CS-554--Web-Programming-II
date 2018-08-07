import React,{Component} from 'react' 
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from "react-router-dom";
import Login from '../components/login';
import SignUp from '../components/register';

class App extends Component{
 
    render(){ 
        
        return (
            <div className="App">
            <div className="container">
            <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={SignUp} />
            </Switch>
          </Router>
          </div>
          </div>
        );
    }
}

export default App;