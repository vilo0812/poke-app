import React, {Fragment, useState} from 'react'
const Formulario = () => {
	const [number] = useState(1);
	const [datos,setDatos] = useState({
		nombre: '',
		apellido: ''
	});
	const handleInputChange = (event) => {
		setDatos({
			...datos,
			[event.target.name] : event.target.value
		})
	};
	const enviarDatos = (event) => {
	event.preventDefault()
	console.log(datos.nombre + ' ' + datos.apellido)
	}
	return (
		<Fragment>
			<div className="container">
				<h1>Formulario</h1>
				<form className="row" onSubmit={enviarDatos}>
				<div className="col-md-3">
					<input
					placeholder="Ingrese Nombre"
					className="form-control"
					type="text"
					name="nombre"
					onChange={handleInputChange}/>
				</div>
				<div className="col-md-3">
					<input
					placeholder="Ingrese Apellido"
					className="form-control"
					type="text"
					name="apellido"
					onChange={handleInputChange}/>
				</div>
				<div className="col-md-3">
					<button
					className="btn btn-primary"
					type="submit"
					>Enviar</button>
				</div>
				</form>
				<h3> {datos.nombre} - {datos.apellido}</h3>
			</div>
		</Fragment>
	);
}
export default Formulario;