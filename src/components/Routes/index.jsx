import React, {Fragment} from 'react'
import Inicio from './Inicio'
import Nostros from './Nosotros'
import Contacto from './Contacto'
import Civilizacion from './Civilization'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
const Routes = () =>{
  return (
    <Fragment>
      <Router>
        <div className="container">
          <div className="btn-group">
            <Link to="/" className="btn btn-dark mt-5 mr-3">
              Inicio
            </Link>
            <Link to="/nosotros" className="btn btn-dark mt-5 mr-3">
              Nostros
            </Link>
            <NavLink to="/contacto" className="btn btn-dark mt-5 mr-3" activeClassName="active">
              Contacto
            </NavLink>
          </div>
          <hr/>
          <Switch>
            <Route path="/contacto">
              <Contacto/>
            </Route>
            <Route path="/nosotros/:id">
              <Civilizacion/>
            </Route>
            <Route path="/nosotros">
              <Nostros/>
            </Route>
            <Route path="/" exact>
              <Inicio/>
            </Route>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}
export default Routes;
