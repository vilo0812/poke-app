import React, {Fragment} from 'react'
import { useForm } from 'react-hook-form'
const EditUserForm= ({currentUser,updateUser}) =>{
	const {register, errors, handleSubmit, setValue} = useForm({
		defaultValues: currentUser
	});
	setValue('name',currentUser.name)
	setValue('username',currentUser.username)
	//start hacemps el submit
	const onSubmit = (data, e) => {
		data.id = currentUser.id
		updateUser(data);
		e.target.reset()
    }
	//end hacemps el submit
	return (
		<Fragment>
			<form onSubmit={handleSubmit(onSubmit)}>
		      <label>Name</label>
		      <input type="text" name="name" ref={
		      	register({
		      		required: {value:true, message:'campo obligatorio'},
		      	})
		      }/>
		      <div>
    				{errors?.name?.message}
		      </div>	
		      <label>Username</label>
		      <input type="text" name="username" ref={
		      	register({
		      		required: {value:true, message:'campo obligatorio'},
		      	})
		      }/>
		      <div>
    				{errors?.username?.message}
		      </div>
		      <button>Edit User</button>
		    </form>
		</Fragment>
	);
}
export default EditUserForm;