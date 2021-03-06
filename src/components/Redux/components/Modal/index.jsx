import React, {Fragment} from 'react'
import './styles.css'
import PropTypes from 'prop-types'
// import Details from './../pokemones/Details'
const Modal = ({appear,change,children}) => {
	return (
		<Fragment>
			
		  <div className={appear ? 'appear' : 'none'} onClick={change} >
			  <div className="modal-content">
			    <span onClick={change} className="close">
			    &times;
			    </span>
			    {children}
			   </div>
		   </div>
		</Fragment>
	)
}
Modal.propTypes = {
  appear: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,// const change = () => (setModal(!modal))
}
export default Modal