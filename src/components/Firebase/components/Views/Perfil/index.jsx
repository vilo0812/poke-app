import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {actualizarDisplayNameAccion, actualizarFotoAccion} from './../../../ducks/loginDuck'

const Perfil = () => {
    //start variables  estaticas
    const dispatch = useDispatch()
	const user = useSelector(store => store.login.user)
    const loading = useSelector(store => store.login.active)
    //start variables estaticas
    //start variables de estado    
    const [displayName, setDisplayName] = React.useState()
    const [editarNombre, setEditarNombre] = React.useState(false)
    const [editarFotoPerfil, setEditarFotoPerfil] = React.useState(false)
    const [error, setError] = React.useState(false)
    //end variables de estado
    //start handle inputs
    // start handle change inputs de texto
    const handleChange = event => {
     if(event.target.name === 'nombre'){
        setDisplayName({
            ...displayName,
            nombre:event.target.value
        })
     }
    }
    // end handle change inputs de texto
    // handle de input tipo file
    const handleArchivo = (e) => {
    console.log(e.target.files[0])   
    const imagen = e.target.files[0]
    if(imagen === undefined){
        console.log('sin imagen')
        return
    }

    if(imagen.type === 'image/jpeg' || imagen.type === 'image/png' || imagen.type === 'image/jpg'){
        dispatch(actualizarFotoAccion(imagen))       
        setError(false) 
        }else{
        console.log('archivo no válido')
        setError(true)
        return
        }
    }
    // handle de input tipo file
    //end handle inputs
    //start metodos
    // start metodo para editar el nombre de usuario
    const botonEditarNombre = () => {
        if(!displayName.nombre.trim()){
            console.log('nombre vacío')
            return
        }
        dispatch(actualizarDisplayNameAccion(displayName.nombre))
        setEditarNombre(false)
        setDisplayName('');
    }
    // end metodo para editar el nombre de usuario
    //end metodos
	return (
		 <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={user.photoURL ? user.photoURL : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png`} width="100" className="img-fluid rounded" alt=""/>
                    <h5 className="card-title">nombre: {user.displayName}</h5>
                    <p className="card-text">email: {user.email}</p>
                    <button 
                        className='btn btn-warning' 
                        onClick={() => setEditarNombre(!editarNombre)}
                    >
                        Editar Nombre
                    </button>
                {
                false &&
                    (<button 
                        className='btn btn-warning ml-2' 
                        onClick={() => setEditarFotoPerfil(!editarFotoPerfil)}
                    >
                        Editar Foto de Perfil
                    </button>)
                }
                </div>
                {
                    loading &&
                    <div className="card-body">
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border text-warning" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
                {
                    editarNombre &&
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Recipient's username"
                                        name="nombre"
                                        onChange={(e) =>handleChange(e)} 
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button"
                                            onClick={() => botonEditarNombre()}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
             {
                editarFotoPerfil &&
                <div className="custom-file">
                {
                    error &&
                    <div className="alert alert-warning">
                        Foto en .png o .jpg
                    </div>
                }
                    <input 
                        type="file" 
                        className="custom-file-input" 
                        id="validatedCustomFile" 
                        required 
                        disabled={loading}
                        style={{display:'none'}}
                        onChange={e => handleArchivo(e)}
                        />
                    <label 
                        className={loading ? "btn btn-outline-secondary" : "btn btn-primary"}
                        htmlFor="validatedCustomFile"
                        >
                            Editar foto perfil
                    </label>
                </div>
            }
            </div>
        </div>
	);
}
export default Perfil;