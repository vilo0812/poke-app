import React, {Fragment, useState} from 'react'
import {firebase} from './helpers/FirebaseData'

const FirebaseAuthStorage = () => {
//start variables de estado    
const [user, setUser] = useState({})
//end variables de estado
//start efect
	 React.useEffect(() => {
	 	firebase.auth().onAuthStateChanged(user => {
	 	setUser({user})
	 	})
	  }, [])
//end efect
// start handles
// start handle de el boton de iniciar sesion
	const handleAuth = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(result => console.log(`${result.user.email} ha iniciado sesión`))
		.catch(error => console.log(`Error ${error.code} - ${error.message}`))
	}
// end handle de el boton de iniciar sesion
// start handle para cerrar la sesion
	const handleLogout = () => {
		firebase.auth().signOut()
		.then(result => console.log(`${result.user.email} ha salido`))
		.catch(error => console.log(`Error ${error.code} - ${error.message}`))
	}
// end handle para cerrar la sesion
// end handles
// start metods
	const renderingLoginButton = () => {
		if(user){
			return(
				<div> 
					<img src={user.photoURL} alt={user.displayName}></img>
					<p>hola {user.displayName}</p>
					<button onCLick={() => handleLogout()}>Salir</button>
				</div>
			);
		}else{
			return(
				<button onClick={() => handleAuth()}>Login con Google</button>
			);
		}
	}
// end metods
	return (
		<Fragment>
			{renderingLoginButton()}
		</Fragment>
	);
}
export default FirebaseAuthStorage;