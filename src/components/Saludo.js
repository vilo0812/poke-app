import React, {Fragment} from 'react'
const Saludo= (props) =>{
	const {person} = props;
	return (
		<Fragment>
			<h2>hola! {person}</h2>
		</Fragment>
	);
}
export default Saludo;