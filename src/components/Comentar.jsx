import React, {Fragment} from 'react'
import Avatar from './Avatar.jsx'
const Comentar = ({subject}) => {
	return (
		<Fragment>
			<h1>Comentario</h1>
			<hr></hr>
			<div className="media">
			  <Avatar urlImage={subject.urlImage}/>
			  <div className="media-body">
			    <h5 className="mt-0">{subject.name}</h5>
			    {subject.text}
			  </div>
			</div>
		</Fragment>
	);
}
export default Comentar;