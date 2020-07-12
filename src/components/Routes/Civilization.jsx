import React, {Fragment} from 'react'
import {useParams} from 'react-router-dom'
const Civilization = () =>{
  const {id} = useParams()
  const [town, setTown] = React.useState([]);
    React.useEffect( () => {
    const obtenerDatos = async () => {
        const data = await fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${id}`)
        const users = await data.json()
        setTown(users)
        // console.log(users)
    }
        // console.log('useEffect')
        obtenerDatos()
    }, [id])
  return (
    <Fragment>
        <h3>{town.name}</h3>
        <p>{town.team_bonus}</p>
    </Fragment>
  );
}
export default Civilization;