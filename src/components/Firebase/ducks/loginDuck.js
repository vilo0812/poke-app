    import {auth, firebase} from './../helpers/firebaseData'
const dataInicial = {
    loading: false,
    activo: false
}

const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'
//start reducer
export default function loginReducer (state = dataInicial, action){

    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USER_ERROR:
            return {...dataInicial}
        case USER_EXITO:
            return {...state, loading: false, activo: true, user: action.payload.user}
        case CERRAR_SESION:
            return {...dataInicial}
        default: 
            return {...state}
    }

}
//end reducer
// start ACCIONES
export const accederAccion = () => async(dispatch) => {

    dispatch({
        type: LOADING
    })

    try {
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}
// start loging success accion 
export const loginAccion = async (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider)
    dispatch({
        type: USER_EXITO,
        payload: {
            user: {
                uid: res.user.uid,
                email: res.user.email
            }
        }
    })
    localStorage.setItem('pokeUser', JSON.stringify({
        uid: res.user.uid,
        email: res.user.email
    }))
}
// end loging success accion 
//start accion cerrar sesión
export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    dispatch({
        type: CERRAR_SESION
    })
    localStorage.removeItem('pokeUser')
}
//start accion cerrar sesión
// start leer usuario accion
export const leerUsuarioAccion = () => async (dispatch) => {
    if(localStorage.getItem('pokeUser')){
        dispatch({
            type: USER_EXITO,
            payload: {
                user: JSON.parse(localStorage.getItem('pokeUser'))
            }
        })
    }
}
//end leer usuario accion
//start iniciar sesion
export const iniciarSesionAccion = (payload) => async(dispatch) => {
    firebase.auth().signInWithEmailAndPassword(payload.email,payload.contrasena)
    .then((res) => {    
    dispatch({
        type: USER_EXITO,
        payload: {
            user: {
                uid: res.user.uid,
                email: res.user.email
            }
        }
    })
    localStorage.setItem('pokeUser', JSON.stringify({
        uid: res.user.uid,
        email: res.user.email
    }))
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}
// export const iniciarSesionAccion =  (dispatch) => {
//     console.log("hola");
    // const data = await firebase.auth().signInWithEmailAndPassword(payload.email,payload.contrasena)
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(errorCode);
    //   console.log(errorMessage);
    // });
    // dispatch({
    //     type: USER_EXITO,
    //     payload: {
    //         user: {
    //             uid: data.user.uid,
    //             email: data.user.email
    //         }
    //     }
    // })
    // localStorage.setItem('pokeUser', JSON.stringify({
    //     uid: data.user.uid,
    //     email: data.user.email
    // }))
// }
//end iniciar sesion
// end ACCIONES