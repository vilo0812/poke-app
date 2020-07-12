import React, {Fragment, useState} from 'react'
const Lista = () => {
	const [numero,setNumero] = useState(5);
	const [list,setList] = useState([1,2,3,4,5,6,7,8,9]);
	const agregarElemento = () => {
		setNumero(numero + 1)
		setList([
			...list,
			list.length + 1
			]);
	}
	return (
	<Fragment>
		<h2>Lista</h2>
		<button onClick={agregarElemento}>Agregar</button>
		{
			list.map((item,index) => <p key={index}>{index} - {item}</p>)
		}
	</Fragment>
	);
}
export default Lista;