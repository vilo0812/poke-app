import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { cerrarSesionAccion } from './../../ducks/loginDuck'
import {withRouter} from 'react-router-dom'
const Navbar = (props) => {
    const dispatch = useDispatch()

    const cerrar = () => {
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }
    const activo = useSelector(store => store.login.activo)
    return (
        <div className="navbar navbar-light bg-primary">
            <Link to="/" className="navbar-brand text-light">Poke API</Link>
            <div>
                <div className="d-flex">
                    {
                        activo ? (
                            <>
                                <NavLink 
                                    className="btn btn-success mr-2" 
                                    to="/"
                                    exact
                                >
                                    lista de pokemones
                                </NavLink>
                                <button
                                    className="btn btn-success"
                                    onClick={() => cerrar()}
                                >
                                    cerrar Sesión
                                </button>
                            </>
                        ) : (
                        <div>
                            <NavLink 
                                className="btn btn-success mr-2" 
                                to="/login"
                                exact
                            >
                                Iniciar Sesión
                            </NavLink>
                            <NavLink 
                                className="btn btn-success mr-2" 
                                to="/loginup"
                                exact
                            >
                                Registrarse
                            </NavLink>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)