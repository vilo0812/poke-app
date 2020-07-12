import React, {useState} from 'react'
import UserTable from './UserTable'
import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import Form from './Form'
import { v4 as uuidv4 } from 'uuid';
const CRUD= () =>{
  const usersData = [
    { id: uuidv4(), name: 'Tania', username: 'floppydiskette' },
    { id: uuidv4(), name: 'Craig', username: 'siliconeidolon' },
    { id: uuidv4(), name: 'Ben', username: 'benisphere' },
  ]
  //state
  const [users, setUsers] = useState(usersData)
  const [editing, setEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState({
  	id: null, name:'',username:''
  })
  //start agregar Usuarios
  const addUser = (user) => {
  	user.id = uuidv4()
  	setUsers([
	...users,
	user
  	])
  }
  //end agregar Usuarios
  //start eliminar usuario
  const deleteUser = id => {
  	const arrayFiltrado = users.filter(user => user.id !== id)
  	setUsers(arrayFiltrado)
	}
  //end eliminar usuario
  // start esta funcion activa el formulario de editar y les pasa los datos a editar
	const editRow = user => {
		setEditing(true);
		setCurrentUser({
		id: user.id, name: user.name, username: user.username
		})
	}
  // end esta funcion activa el formulario de editar y les pasa los datos a editar
  //start funcion que me actualiza los datos de el usuario
  const updateUser = (updateUser) => {
  	setEditing(false);
  	setUsers(users.map(user => (user.id === updateUser.id ? updateUser : user)))
  }
  //end funcion que me actualiza los datos de el usuario
  return (
     <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
        //start formulario
          <Form editing={editing} currentUser={currentUser} updateUser={updateUser} addUser={addUser}/>
        //end formulario
          {

   //        	editing ? (
   //        	<div>
			// 	<h2>Edit user</h2>
   //        		<EditUserForm
   //        		currentUser={currentUser}
   //        		updateUser={updateUser}/>
   //        	</div>
   //        	) : (
			// <div>
			// 	<h2>Add user</h2>
   //        		<AddUserForm addUser={addUser}/>
   //        	</div>
   //        	)

          }
          
        </div>
        <div className="flex-large">
        {/*tart mostramos a los usuarios*/}
          <h2>View users</h2>
          <UserTable 
          users={users} 
          deleteUser={deleteUser}
          editRow={editRow}
          />
        {/*tart mostramos a los usuarios*/}
        </div>
      </div>
    </div>
  );
}
export default CRUD;
