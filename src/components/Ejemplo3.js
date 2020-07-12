import React, { Fragment } from 'react';

const Ejemplo3 = (props) => {
	const {name} = props;
    return (
        <Fragment>
            <h2>Hola! {name}</h2>
        </Fragment>
    );
}
 
export default Ejemplo3;