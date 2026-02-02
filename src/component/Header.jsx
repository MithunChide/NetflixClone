import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/useSlice';
import { LOGO } from '../utils/constant';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
      signOut(auth).then(() => {
          // Sign-out successful.
        }).catch(() => {
          // An error happened.
          navigate("/error")
        });
  }
   useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
          if (user) {
            const {uid , email, displayName, photoURL} = user;
            //update the store
            dispatch(addUser({
              uid:uid,
              email:email,
              displayName:displayName,
              photoURL:photoURL,
            }))
            navigate("/browse");
          } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
          }
        });

        return () => unsubscribe();
    },[])

  return (
    <div className='px-36 py-4 absolute bg-gradient-to-b from-black to-transparent w-full flex justify-between items-center'>
        <img className='w-50'
        src={LOGO} alt="netflix-logo" />

      {user && (
          <div className='flex'>
                <img  className="w-8 h-8" src={user.photoURL} alt="User Logo" />
                <button onClick={handleSignOut} className='font-bold text-white cursor-pointer pl-2'>(Sign Out)</button>
          </div>
      )}
      
    </div>

  )
}

export default Header