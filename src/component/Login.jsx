
import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkvalidData } from '../utils/validation'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/useSlice';
import { USER_AVTAR } from '../utils/constant';

const Login = () => {
    const[isSignInForm, setIsSignInform] = useState(true)
    const [erroMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSigninForm = () => {
        setIsSignInform(!isSignInForm);
    }

    const handleFormValidation = () => {
        const message = checkvalidData(email.current.value, password.current.value);
        setErrorMessage(message)
        if(message) return;

        if(!isSignInForm) {
            //sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVTAR
                        }).then(() => {
                        // Profile updated!
                            const {uid , email, displayName, photoURL} = auth.currentUser;
                            //update the store with latest details
                            dispatch(addUser({
                                uid:uid,
                                email:email,
                                displayName:displayName,
                                photoURL:photoURL,
                            }))
                        }).catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if(errorCode || errorMessage) {
                        setErrorMessage("emailId is already registered, please sign in");
                    }
                });

        } else {
            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if(errorCode || errorMessage) {
                        setErrorMessage("something went wrong with email or password");
                    }
                });
        }
    }

  return (
    <div className=''>
        <Header/>
        <div>
            <img className="h-full w-full" src="https://assets.nflxext.com/ffe/siteui/vlv3/797df41b-1129-4496-beb3-6fc2f29c59d3/web/IN-en-20260112-TRIFECTA-perspective_004732f9-7464-4a7c-940b-4a51c4f0f73f_large.jpg" alt="bg-image" />
        </div>
       
       <div className='absolute left-1/2 top-1/4 -translate-x-1/2 bg-black text-white p-8 w-[350px] opacity-80 rounded-lg'>
        <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className=''>
                <h1 className='mb-4 text-3xl font-bold'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && 
                <input 
                ref={name}
                type="text" placeholder='Full name' name="name" className='w-full p-3 mb-4 bg-gray-700' /> } 
                <input 
                ref={email}
                type="text" placeholder='Email address' name="email" className='w-full p-3 mb-4 bg-gray-700' />
                <input
                ref={password}
                 type="password" placeholder='Password' name="password" className='w-full p-3 mb-6 bg-gray-700' />
                    { erroMessage && (
                         <p className='text-red-600 font-bold mb-4'>{erroMessage}</p>
                    )}
                
                <button className='w-full p-3 mb-4 bg-red-600 cursor-pointer' onClick={handleFormValidation}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            </div>
            <div className='py-4'>
             <p className='cursor-pointer' onClick={toggleSigninForm}> {isSignInForm ? "New to Netflix? Sign up now" : "Alraedy Registered? Sign In now"} </p>
            </div>
        </form>
        
       </div>
        
    </div>
  )
}

export default Login