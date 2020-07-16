import {auth, firebase,db,storage} from './../helpers/firebaseData'
//start data inicial
    const dataInicial = {
        loading: false,
        activo: false
    }
//end data inicial
//start constantes
    const LOADING = 'LOADING'
    const USER_EXITO = 'USER_EXITO'
    const USER_ERROR = 'USER_ERROR'
    const CERRAR_SESION = 'CERRAR_SESION'
//end constantes
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
//start error
    export const errorAccion = () => async(dispatch) => {
        dispatch({
            type: USER_ERROR
        })
    }
//end error
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
        window.location="/login";
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
        dispatch({
            type: LOADING
        })
            let user;
            db.collection('users').where("email", "==", payload.email).get()
            .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                user = {
                    email: doc.data().email,
                    photoURL: doc.data().photoURL,
                    displayName: doc.data().displayName
                }
                dispatch({
                    type: USER_EXITO,
                    payload: {    
                    user: {
                        email: user.email,
                        photoURL: user.photoURL,
                        displayName: user.displayName
                    }
                    }
                })
                localStorage.setItem('pokeUser', JSON.stringify({
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName
                }))
                window.location="/";
            });
            })
            .catch(function(error) {
            console.log(error)
            dispatch({
                type: USER_ERROR 
            })
            console.log("Datos Incorrectos", error);
             });
        // firebase.auth().signInWithEmailAndPassword(payload.email,payload.contrasena)
        // .then((res) => {    
        // dispatch({
        //     type: USER_EXITO,
        //     payload: {
        //         user: {
        //             uid: res.user.uid,
        //             email: res.user.email
        //         }
        //     }
        // })
        // localStorage.setItem('pokeUser', JSON.stringify({
        //     uid: res.user.uid,
        //     email: res.user.email
        // }))
        // })
        // .catch((error) => {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   console.log(errorCode);
        //   console.log(errorMessage);
        // });
    }
//end iniciar sesion
//start editar foto de perfil
    export const actualizarFotoAccion = (imagen) => async (dispatch, getState) => {
        dispatch({
            type: LOADING
        })
        const {user} = getState().login
        try {

            const refImagen = storage.ref().child(user.email).child('foto perfil')
            await refImagen.put(imagen)
            const urlDescarga = await refImagen.getDownloadURL()
                db.collection('users').where("email", "==", user.email).get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    db.collection('usuarios').doc(doc.id).update({
                        photoURL: urlDescarga
                     })
                    const usuarioEditado = {
                        ...user,
                        photoURL: urlDescarga
                    }
                    dispatch({
                        type: USER_EXITO,
                        payload: {
                         user:usuarioEditado
                        }
                    })
                    localStorage.setItem('pokeUser', JSON.stringify(usuarioEditado))
                });
                })
                .catch(function(error) {
                console.log(error)
                dispatch({
                    type: USER_ERROR 
                })
                console.log("Datos Incorrectos", error);
                 });
            
        } catch (error) {
            console.log(error)
        }
    }   
//end editar foto de perfil
//start editar nombre
export const actualizarDisplayNameAccion = (nuevoNombre) => async (dispatch, getState) => {
    // dispatch({
    //     type: LOADING
    // })
    const {user} = getState().login
    const usuarioEditado = {
        ...user,
        displayName: nuevoNombre
    }
    db.collection('users').where("email", "==", user.email).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
                const userRef = await db.collection("users").doc(doc.id);
                userRef.update({
                    displayName:nuevoNombre})
                .then(function() {
                    dispatch({
                        type: USER_EXITO,
                        payload: {    
                        user:usuarioEditado
                        }
                    })
                    localStorage.setItem('pokeUser', JSON.stringify(usuarioEditado))
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });
        });
        })
        .catch(function(error) {
        console.log(error)
        dispatch({
            type: USER_ERROR 
        })
         });
    
}
//end editar nombre
//start registrar poke usuario
export const registrarUsuarioAccion = (payload) => async(dispatch) => {
      let id = await db.collection("users").add({
        email: payload.email,
        photoURL: payload.photoURL,
        displayName: payload.displayName
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
      let docRef = await db.collection("users").doc(id.id).get();
         dispatch({
        type: USER_EXITO,
        payload: {
            user: {
                email: docRef.data().email,
                photoURL: docRef.data().photoURL,
                displayName: docRef.data().displayName
                }
            }
        })
        localStorage.setItem('pokeUser', JSON.stringify({
                email: docRef.data().email,
                photoURL: docRef.data().photoURL,
                displayName: docRef.data().displayName
        }))
    // firebase.auth().createUserWithEmailAndPassword(payload.email,payload.contrasena)
    // .then((res) => {    
    // dispatch({
    //     type: USER_EXITO,
    //     payload: {
    //         user: {
    //             uid: res.user.uid,
    //             email: res.user.email
    //         }
    //     }
    // })
    // localStorage.setItem('pokeUser', JSON.stringify({
    //     uid: res.user.uid,
    //     email: res.user.email
    // }))
    // })
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(errorCode);
    //   console.log(errorMessage);
    // });
}
//end registrar poke usuario
// end ACCIONES