import Modal from 'react-modal';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { Doctor } from './pages/Doctor';
import { Home } from './pages/Home';
import { LoginDoctor } from './pages/LoginDoctor';
import { LoginPatient } from './pages/LoginPatient';
import { Patient } from './pages/Patient';

import './styles/global.css'

Modal.setAppElement('#root')

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/loginDoctor" component={LoginDoctor} />
            <Route exact path="/loginPatient" component={LoginPatient} />
            <Route exact path="/doctor" component={Doctor} />
            <Route exact path="/patient" component={Patient} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
