import axios from 'axios'
//constantes
const dataInicial = {
	count: 0,
    next: null,
    previous: null,
    results: [],
    offset: 0
	// previous: null
}
//start CONSTANTES
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO"
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO"
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'//traer informacion de los pokemones
//end CONSTANTES
//start REDUCER
export default function pokeReducer (state = dataInicial,action){
	switch (action.type) {
		case OBTENER_POKEMONES_EXITO:
			return {...state, ...action.payload}
		case SIGUIENTE_POKEMONES_EXITO:
			return {...state, ...action.payload}
		case ANTERIOR_POKEMONES_EXITO:
            return {...state, ...action.payload}
		case POKE_INFO_EXITO:
            return {...state, details: action.payload}
		default:
			return state
	}	

}
//end REDUCER
//start acciones
// start obtenemos a los pokemones de la api
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
	if(localStorage.getItem('pokeData')){
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('pokeData'))
        })
    }else{
        console.log('no existe')
        try {
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
            dispatch({
                type: OBTENER_POKEMONES_EXITO,
                payload: res.data
            })
            localStorage.setItem('pokeData', JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}
// end obtenemos a los pokemones de la api
// start paginamos a la siguiente pagina
export const siguientePokemonAccion = () => async (dispatch, getState) => {
    const {next} = getState().pokemones
    if(localStorage.getItem(next)){
        try {
            const res = await axios.get(next)
             dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        	})
            localStorage.setItem('pokeData', JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }else{
        try {
            const res = await axios.get(next)
            dispatch({
                type: SIGUIENTE_POKEMONES_EXITO,
                payload: res.data
            })
            localStorage.setItem('pokeData', JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}
// end paginamos a la siguiente pagina
//start paginamos a la pagina anterior
export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    const {previous} = getState().pokemones
    if(localStorage.getItem(previous)){
        console.log('existe')
        try {
            const res = await axios.get(previous)
             dispatch({
            type: ANTERIOR_POKEMONES_EXITO,
            payload: res.data
        	})
            localStorage.setItem('pokeData', JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }else{
        console.log('no existe')
        try {
            const res = await axios.get(previous)
            dispatch({
                type: ANTERIOR_POKEMONES_EXITO,
                payload: res.data
            })
            localStorage.setItem('pokeData', JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}
//end paginamos a la pagina anterior
//start informacion de los pokemones
export const unPokeDetalleAccion = (url, indice) => async (dispatch, getState) => {
    const urlDetails = JSON.parse(localStorage.getItem('pokeDetails'))
    if(urlDetails){
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem('pokeDetails'))
        })
    }else{
    	//start en caso que no hayan entrado nunca, mostrmos a volvasor
		try {
			const url = 'https://pokeapi.co/api/v2/pokemon/1/'
	        const res = await axios.get(url)
	        // console.log(res.data)
	        dispatch({
	            type: POKE_INFO_EXITO,
	            payload: {
	                nombre: res.data.name,
	                foto: res.data.sprites.front_default,
	                alto: res.data.height,
	                ancho: res.data.weight,
	                url: url
	            }
	        })
	    } catch (error) {
	        console.log(error.response)
	    }
    	//end en caso que no hayan entrado nunca, mostrmos a volvasor
    }
    if(url !== undefined){    
    try {
        const res = await axios.get(url)
        // console.log(res.data)
        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: res.data.name,
                foto: res.data.sprites.front_default,
                alto: res.data.height,
                ancho: res.data.weight,
                url: url
            }
        })
        localStorage.setItem('pokeDetails', JSON.stringify({
            nombre: res.data.name,
            foto: res.data.sprites.front_default,
            alto: res.data.height,
            ancho: res.data.weight,
            url: url
        }))

    } catch (error) {
        console.log(error.response)
    }
    }
}
//end informacion de los pokemones
