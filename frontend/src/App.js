
import React from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';

import Infermiers from './pages/Infermiers/Infermiers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddInfermier from './pages/Infermiers/AddInfermier';
import EditInfermiers from './pages/Infermiers/EditInfermiers';
import Patients from './pages/patients/patients';
import AddPatient from './pages/patients/addPatients';
import EditPatient from './pages/patients/editPatients';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Model from './components/model';


function App() {
  return (
    <>
    <Router>
        
        
          <Switch>
          <Route path='/login'   component={Login} />
          <Navbar/>
        <Route path='/' exact  component={Home} />
        <Route path='/Infermiers' exact  component={Infermiers} />
        <Route path='/AddInfermier'   component={AddInfermier} />
        <Route path='/EditInfermier/:id'   component={EditInfermiers} />
        <Route path='/Patients' exact component={Patients} />
        <Route path='/AddPatient' exact  component={AddPatient} />
        <Route path='/EditPatient/:id'   component={EditPatient} />
       
        <Route path='/dashboard'   component={Dashboard} />
        <Route path='/model'   component={Model} />

        </ Switch>
        
      </Router>
      </>
  );
}

export default App;
