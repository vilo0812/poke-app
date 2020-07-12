import React, {Fragment} from 'react'
const Avatar = ({urlImage}) => {
	return (
		<Fragment>
			  <img src={urlImage} className="mr-3" alt="..."/>
		</Fragment>
	);
}
export default Avatar;