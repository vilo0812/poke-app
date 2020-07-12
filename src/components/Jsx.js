import React, {Fragment, useState} from 'react'
const Jsx = () => {
	const saludo = 'hola Jsx :v'
	const temperatura = 21;
	return (
		<Fragment>
			<h2>frio o calor?</h2>
			<h4>
				{temperatura > 20 ? 'hace calor' : 'hace frio'}
			</h4>
		</Fragment>
	);
}
export default Jsx;