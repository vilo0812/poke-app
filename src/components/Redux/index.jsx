import React from 'react'
// import Pokemones from './../Pokemones'
import Pokemones from './components/pokemones'
import {Provider} from 'react-redux'
import generateStore from './store'
const Redux = () =>{
	const store = generateStore()
  return (
    <Provider store={store}>
    	<div className="container mt-3">
     	    <Pokemones></Pokemones>
      </div>
    </Provider>
  );
}
export default Redux;
