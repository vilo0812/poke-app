import React, {useState} from 'react'
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux'
import Modal from './../Modal'
import {useDispatch, useSelector} from 'react-redux'
// import {obtenerPokemonesAccion} from './../Redux/pokeDucks'
import {obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion,unPokeDetalleAccion} from './../../pokeDucks.js'
import Details from './Details'

const Pokemones = () =>{
// const Pokemones = ({pokemones, dispatch}) =>{
	const dispatch = useDispatch()
  const pokemones = useSelector(store => store.pokemones.results)
  const next = useSelector(store => store.pokemones.next)
  const previous = useSelector(store => store.pokemones.previous)
  const pokeDetails = url => {
    dispatch(unPokeDetalleAccion(url))
    change()
    }
    //start modal
    const [modal,setModal] = useState(false);
    const change = () => (setModal(!modal))
    // const modalAppear = pokemon => console.log(pokemon.name);
    //end modal
  return (
    <div className="row">
    <div className="col-md-6">
        <Modal change={change} appear={modal}> 
            <Details></Details>
        </Modal>
        <h3>Lista de Pokemons</h3>

        <div className="d-flex justify-content-between">
            {
                pokemones.length === 0 && 
                <button 
                    onClick={() => dispatch(obtenerPokemonesAccion())}
                    className="btn btn-primary"
                >
                     Ver Pokemones
                </button>
            }
            {
                next && 
                <button onClick={() => dispatch(siguientePokemonAccion())} className="btn btn-primary mr-2">Siguiente</button>
            }
            {
                previous && 
                <button onClick={() => dispatch(anteriorPokemonAccion())} className="btn btn-primary">Anterior</button>
            } 
        </div>
        
        <ul className="list-group mt-3 text-uppercase">
            {
                pokemones.map((item,index) => (
                    <li className="list-group-item" key={index} >
                        {item.name}
                        <button 
                        className="btn btn-primary btn-sm float-right"
                        onClick={() => pokeDetails(item.url)}
                        >
                            Detalles
                        </button>
                    </li>
                ))
            }
        </ul>
    </div>
    <div className="col-md-6" height = '1000' onClick={change}>
        <Details />
    </div>
</div>
  );
}
// Pokemones.propTypes = {
//   pokemones: PropTypes.array.isRequired,
//   pokemones: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired
//   }).isRequired).isRequired,
// }
// const mapStateToProps = state => ({pokemones: state.pokemones.array});
// const mapDispatchToProps = dispatch => (
//   {
//   dispatch: value => dispatch(obtenerPokemonesAccion(value))
//   }
// );
// export default connect(mapStateToProps,mapDispatchToProps)(Pokemones);
export default Pokemones;
