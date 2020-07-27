import React, {Fragment} from 'react';

import PokeList from './components/Views/PokeList';
import Perfil from './components/Views/Perfil';
import Login from './components/Views/Login';
import LoginUp from './components/Views/Login/LoginUp';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {db} from './helpers/firebaseData'

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => wr{
    const fetchUser = async () => {
      setLoading(true)
      if(await localStorage.getItem('pokeUser')){
      const user = await JSON.parse(localStorage.getItem('pokeUser'))
      db.collection("users").where("email", "==", user.email).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            setFirebaseUser(true)
            setLoading(false)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
      }else{
        setFirebaseUser(false)
        setLoading(false)
      }
    } 
    // const iniciarSesion = async () => {
    //   const user = await JSON.parse(localStorage.getItem('pokeUser'))
    //   dispatch(iniciarSesionAccion(user))
    // }
    fetchUser()
    // firebaseUser ? iniciarSesion() : dispatch(errorAccion)
  }, [])
  //loacalstorage
  //start protegemos las rutas
  const RutaProtegida = ({component, path, ...rest}) => {
    if(firebaseUser){
        console.log('acceso permitido')
        return <Route component={component} path={path} {...rest} />
    }else{
      console.log('acceso denegado')
      return <Redirect to="/login" {...rest} />
    }
  }
  //end protegemos las rutas
  //start protegemos las rutas
  const RutaProtegida2 = ({component, path, ...rest}) => {
    if(!firebaseUser){
      console.log('acceso permitido')
        return <Route component={component} path={path} {...rest} />
    }else{
      console.log('acceso denegado')
      return <Redirect to="/" {...rest} />
    }
  }
  //end protegemos las rutas
  return (
<Fragment>
  { loading === true ? (
    
    ) : (
      <Router>
        <div className="container mt-3">
          <Navbar />
           <Switch>
             <RutaProtegida component={PokeList} path="/" exact/>
             <RutaProtegida component={Perfil} path="/perfil" exact/>
            <RutaProtegida2 component={Login} path="/login" exact/>
            <RutaProtegida2 component={LoginUp} path="/loginup" exact/>
          </Switch>
        </div>
      </Router>
    )
  }
</Fragment>
  );
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