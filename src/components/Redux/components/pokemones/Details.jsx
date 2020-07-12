import React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {unPokeDetalleAccion} from './../../pokeDucks'

const Details = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        const obtenerInfo = () => {
            dispatch(unPokeDetalleAccion())
        }
        obtenerInfo()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.details)
    // console.log(pokemon)

    return pokemon ? (
        <div className="card text-center text-uppercase">
            <div className="card-body">
                <img className="img-fluid" alt="" src={pokemon.foto} />
                <div className="card-title">{pokemon.nombre}</div>
                <p className="card-text">Alto: {pokemon.alto} - Ancho: {pokemon.ancho}</p>
            </div>
        </div>
    ) : null
}

export default Details