import React, { useEffect, useState } from "react"
import Header from "./components/layouts/header"
import Footer from "./components/layouts/footer"
import SignIn from "./components/layouts/pages/sign-in"
import Register from "./components/layouts/pages/sign-up"
import Profile from "./components/layouts/pages/user-profile"
import Home from './components/layouts/pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import ProfileState from './components/layouts/Profile/ProfileState'
import UserAuth from "./components/layouts/auth/AuthState"
import AuthToken from './components/layouts/auth/tokenAuth'
import PrivateRoute from './components/layouts/auth/ProtectRoute'
import AddCurriculum from './components/layouts/pages/AddCurriculum'
import ViewIndividualCurriculum from './components/layouts/pages/ViewIndividualCurriculum'
import EditCurriculum from './components/layouts/pages/EditCurriculum'

  if(localStorage.token){
      AuthToken(localStorage.token)
  }

function App() {
  const [posts,setCurriculum]=useState([])
  useEffect(()=>{
    axios.get('/api/curriculum')
    .then(res=>setCurriculum(res.data))
    .catch(error=>console.log(error))
  })
  return (


    <UserAuth>
    <ProfileState>
    <div className="App">
      <Router>
        <Header />
        <div className="auth-wrapper">
        <div className="auth-inner">
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={Register} />
          
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route path="/curriculum" render={() => <Home posts={posts}/>} />
          <Route exact path="/api/curriculum/:id" render={(props) => <ViewIndividualCurriculum {...props} posts={posts}/>} />
          <Route exact path="/api/curriculum/update/:id" render={(props) => <EditCurriculum {...props} posts={posts}/>} />
          <PrivateRoute exact path="/add-curriculum" component={AddCurriculum} />
        </Switch>
        </div>
      </div>
      <Footer />
      </Router>
    </div>
    </ProfileState>
    </UserAuth>
  );
}
//<PrivateRoute exact path="/curriculum" component={Home} />
export default App;
