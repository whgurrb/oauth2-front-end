import { Route, Routes } from 'react-router-dom';
import SignUp from 'views/Authentication/SignUp';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/auth'>
        <Route path='sign-up' element={<SignUp />} />
      </Route>
    </Routes>
  ); 
}

export default App;
