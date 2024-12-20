import { Route, Routes } from 'react-router-dom';
import SignUp from 'views/Authentication/SignUp';
import SignIn from 'views/Authentication/SignIn';
import './App.css';
import Home from 'views/Home';
import OAuth from 'views/Authentication/OAuth';


function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route path='' element={<Home />} />
      </Route>
      <Route path='/auth'>
        <Route path='sign-up' element={<SignUp />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='oauth-response/:token/:expirationTime' element={<OAuth />} />
      </Route>
    </Routes>
  ); 
}

export default App;
