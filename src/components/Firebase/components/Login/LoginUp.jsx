import React,{useEffect,useState, Fragment} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {accederAccion,registrarUsuarioAccion} from './../../ducks/loginDuck'
import Modal from './../Modal'

import { withRouter } from 'react-router-dom';
const Login = (props) => {
	const dispatch = useDispatch()
    const loading = useSelector(store => store.login.loading)
    const activo = useSelector(store => store.login.activo)
    const {history} = props;
    useEffect(() => {//verificamos la sesión
        console.log(activo)
        if(activo){
            history.push('/')
        }
    }, [activo,history])
    // start  iniciar sesion
    const [payload,setPayload] = useState({
    	email:'gabriel',
    	contrasena:'1234'
    });
    const handleChange = event => {
     if(event.target.name === 'email'){
     	setPayload({
     		...payload,
     		email:event.target.value
     	})
     }else{
		setPayload({
     		...payload,
     		contrasena:event.target.value
     	})
     }
  	}
    // end  iniciar sesion
    //start modal
    const [modal,setModal] = useState(false);
    const change = () => (setModal(!modal))
    // dispatch(accederAccion())
    // const modalAppear = pokemon => console.log(pokemon.name);
    //end modal
    return (
    	<Fragment>
    	<Modal change={change} appear={modal}>
    		<p className="text-center display-4">Registrar Usuario</p>
    		<input 
    		 name="email" 
			 className="form-control" 
			 type="email" 
			 placeholder="ingresa email"
    		onChange={(e) =>handleChange(e)}/>
    		<div className="mt-2"></div>
			<input 
			name="contrasena"  
			className="form-control" 
			type="password" 
			placeholder="ingresa contraseña"
			onChange={(e) =>handleChange(e)}/>
    		<button type="button" className="btn btn-primary" 
    		onClick={() =>{
            dispatch(accederAccion())   
			dispatch(registrarUsuarioAccion(payload))
    		}}>Registrarse</button>
    	</Modal>
        <div className="mt-5 text-center">
            <h3>Registrarse</h3>
            <hr/>
            <button 
                className="btn btn-primary"
                onClick={() => {
                	change()
                }}
                disabled={loading}
            >
                Registrarse
            </button>
        </div>
        </Fragment>
    )
}
export default withRouter(Login)