import React, {Fragment} from 'react'
import { useForm } from 'react-hook-form'
const AddUserForm= ({addUser}) =>{
	const {register, errors, handleSubmit} = useForm();
	//start hacemps el submit
	const onSubmit = (data, e) => {
        addUser(data);
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
		      <button>Add new user</button>
		    </form>
		</Fragment>
	);
}
export default AddUserForm;