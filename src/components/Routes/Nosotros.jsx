import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
const Nosotros = () =>{
	const [team, setTeam] = React.useState([]);
	React.useEffect( () => {
		// console.log('useEffect')
		obtenerDatos()
	}, [])
	const obtenerDatos = async () => {
		const data = await fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations`)
		const users = await data.json()
		setTeam(users.civilizations)
		// console.log(users)
	}
  return (
    <Fragment>
    	<h1>Nosotros</h1>
    	<ul>
    		{
    			team.map( (item,index) => (
    				<li key={index}>
                        <Link to={`/nosotros/${item.id}`}>
                        {item.name} - {item.expansion}
                        </Link>
                   </li>
    			))
    		}
    	</ul>	
    </Fragment>
  );
}
export default Nosotros;