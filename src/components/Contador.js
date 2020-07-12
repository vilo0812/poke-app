import React, {Fragment, useState} from 'react'
const Contador = () => {
	const [number,setNumber] = useState(1);
	const aumentar = () =>(setNumber(number + 1));
	return(
	<Fragment>
		<h3>Mi primer component {number}</h3>
		<button onClick={aumentar}>Aumentar</button>
	</Fragment>
	);
}
export default Contador;