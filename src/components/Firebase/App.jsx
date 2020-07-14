import React from 'react';

import PokeList from './components/Views/PokeList';
import Login from './components/Login';
import LoginUp from './components/Login/LoginUp';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {auth} from './helpers/firebaseData'

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    } 
    fetchUser()
  }, [])
  //loacalstorage
  //start protegemos las rutas
  const RutaProtegida = ({component, path, ...rest}) => {
    if(localStorage.getItem('pokeUser')){
      const usuarioStorage = JSON.parse(localStorage.getItem('pokeUser'))
      if(usuarioStorage.uid === firebaseUser.uid){
        console.log('son iguales')
        return <Route component={component} path={path} {...rest} />
      }else{
        console.log('no exite')
        return <Redirect to="/login" {...rest} />
      }
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }
  //end protegemos las rutas
  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <Navbar />
        <Switch>
          <RutaProtegida component={PokeList} path="/" exact/>
          {/* <Route component={Pokemones} path="/" exact/> */}
          <Route component={Login} path="/login" exact/>
          <Route component={LoginUp} path="/loginup" exact/>
        </Switch>
      </div>
    </Router>
  ) : (<div>Cargando...</div>)
  // return (
  //   <Router>
  //       <div className="container mt-3">
  //           <Navbar />
  //           <Switch>
  //               <Route component={PokeList} path="/" exact/>
  //               <Route component={Login} path="/login" exact/>
  //           </Switch>
  //       </div>
  //   </Router>
  // );
}

export default App;