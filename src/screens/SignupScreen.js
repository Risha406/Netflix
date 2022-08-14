import React, {useRef} from 'react';
import './SignupScreen.css';
import {auth} from "../firebase";

function SignUpScreen() {
    const emailRef = useRef(null);  //big finger pointing at html; element
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser)=>{
            console.log(authUser);
        })
        .catch((error)=>{
            alert(error.message);
        })
    }      //if a button is in the form it will refresh so to prevent that we use default 

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser)=>{
            console.log(authUser);
        })
        .catch((error)=>{
            alert(error.message);
        })
        
    }
    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email"/>
                <input ref={passwordRef} placeholder="Password" type="password"/>
                <button type="submit" onClick={signIn}> Sign In</button>

                <h4>
                    <span className="signupScreen__gray">New to Netflix? </span>  
                    <span className='signupScreen__link' onClick={register}>Sign Up Now.</span>                                            
                </h4>
            </form>
        </div>
    )
}

export default SignUpScreen
 

//span will allow to style the different sentences 