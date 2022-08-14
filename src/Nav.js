import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';

function Nav() {
const [show, handleShow]= useState(false);  //initiliaze a variable so as to render accordingly
const history = useHistory()

const transitionNavBar = () => {
    if (window.scrollY > 10) {     //vertical scroll more than 100
        handleShow(true);
    }  else{
        handleShow(false)
    }
}

useEffect(() => {
    window.addEventListener("scroll", transitionNavBar) //listen for the event scroll and trigger the function transitionNav Bar
    return () =>  window.removeEventListener('scroll', transitionNavBar) //cleanup        
}, [])

    return (
        <div className={`nav ${show && 'nav__black'}`}>   
            
            <div className="nav__contents">
                <img onClick={() => history.push("/")} className="nav__logo" 
                    src= "http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                    alt=""
                />

                <img onClick={() => history.push("/profile")} className="nav__avatar"
                    src="https://i.pinimg.com/originals/fb/8e/8a/fb8e8a96fca2f049334f312086a6e2f6.png" 
                    alt=""
                />
            </div>       
        </div>
    )
}

export default Nav

/*only render if the show variable is true */
//http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png