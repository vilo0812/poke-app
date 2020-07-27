import React, {Fragment} from 'react'
import { useForm } from 'react-hook-form'
const Form= ({currentUser,updateUser,addUser,editing}) =>{
	const {register, errors, handleSubmit, setValue} = useForm({
		defaultValues: currentUser
	});
	setValue('name',currentUser.name)
	setValue('username',currentUser.username)
	//start hacemps el submit
	const onSubmit = (data, e) => {
		if(editing){
		data.id = currentUser.id
		e.target.reset()
		updateUser(data)
		}else{
		addUser(data)
		e.target.reset()
		}
		
    }
	//end hacemps el submit
	return (
		<Fragment>
			<h1>
				{
		      	editing ?
		     	"Edit User" :
		      	"Add User"
		      }
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
		      <label>Name</label>
		      <input type="text" name="name" ref={
		      	register({
		      		required: {value:true, message:'correo obligatorio'},
		      	})
		      }/>
		      <div>
    				{errors?.name?.message}
		      </div>	
		      <label>Username</label>
		      <input type="text" name="username" ref={
		      	register({
		      		required: {value:true, message:'clave obligatoria'},
		      	})
		      }/>
		      <div>
    				{errors?.username?.message}
		      </div>
		      {
		      editing ?
		      <button>Edit User</button> :
		      <button>Add new user</button>
		      }
		    </form>
		</Fragment>
	);
}
export default Form;