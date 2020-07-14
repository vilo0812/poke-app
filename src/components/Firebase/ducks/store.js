import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import pokeReducer from './pokeDucks'
import loginReducer, {leerUsuarioAccion} from './loginDuck'
 
 const rootReducer = combineReducers ({
 	pokemones: pokeReducer,
 	login: loginReducer,
 })

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 export default function generateStore(){
 	const store = createStore( rootReducer,composeEnhancers(applyMiddleware(thunk)))
 	leerUsuarioAccion()(store.dispatch)
 	return store;
 }