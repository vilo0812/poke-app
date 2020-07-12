import React from 'react'
// import Pokemones from './../Pokemones'
import PokeList from './components/views/PokeList'
import {Provider} from 'react-redux'
import generateStore from './ducks/store'
const PokePractica = () =>{
	const store = generateStore()
  return (
    <Provider store={store}>
    	<div className="container mt-3">
     	    <PokeList></PokeList>
      </div>
    </Provider>
  );
}
export default PokePractica;
