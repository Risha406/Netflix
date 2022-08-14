import React, {useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { auth } from './firebase';
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";

function App() {
  const user=useSelector(selectUser);   //if {name:'Rishab'} then it would get to the home page
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((userAuth) => {   //t listens to any authenticated change
      if (userAuth) {
        //Logged in
        dispatch(login({
          uid: userAuth.uid,
          email:userAuth.email,
        }));
      } else {
        //Logged out
        dispatch(logout());
      }
    }) 
    
    return unsubscribe; //dont want to use another listener so it wont affect the performance
  }, [dispatch]);

  return (
    <div className="app">
    
      <Router>
        {!user ? (   //if no user render Login page else render the home page
          <LoginScreen/>
        ): (
          <Switch>   
            <Route path="/profile">
              <ProfileScreen/>
            </Route>

            <Route exact path="/">
              <HomeScreen/> 
            </Route>
          </Switch>
        )}
      </Router>
    </div>
        
  );
}

export default App;
