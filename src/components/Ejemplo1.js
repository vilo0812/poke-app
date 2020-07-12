import React, {Fragment, useState} from 'react'
import { useForm } from "react-hook-form";
const Ejemplo1 = () =>{
	const { register, handleSubmit, errors } = useForm();
	const [input, setInput] = useState([]);
	const onSubmit = (data,e) => {
		console.log(data)
		setInput([
		...input,
		data
		]);
	data.target.reset();
	};
	return (
		<Fragment>
			<h2>ejemplo 1</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
				name="title"
				placeholder="Ingrese un titulo"
				className="form-control my-2"
				ref={register({
					required: {value:true, message: 'campo obligatorio'},
					minLength: {value: 2, message: 'minimo dos letras'}
				})}
				/>
				{
					errors.title && 
					<span className="text-danger text-small d-block mb-2">
						{errors.title.message}
					</span>
				}
				<input
				name="description"
				placeholder="Ingrese su descripción"
				className="form-control my-2"
				ref={register({
					required: {value:true, message: 'campo obligatorio'},
					minLength: {value: 2, message: 'minimo dos letras'}
					})}
				/>
				{
					errors.description && 
					<span className="text-danger text-small d-block mb-2">
						{errors.description.message}
					</span>
				}
				<button className="btn btn-primary">Agregar</button>
			</form>	
			<ul>
				{
					input.map(item =>
						<li>{item.title} - {item.description}</li>
					)
				}
			</ul>
		</Fragment>
	);
}
export default Ejemplo1;