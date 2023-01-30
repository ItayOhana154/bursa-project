import './App.css';
import Login from './component/login';
import { Routes, Route } from 'react-router-dom';
import HomePage from './component/homePage';
import Register from './component/register';
import Main from './component/main';
import Portfolio from './component/portfilo';
import UserInfo from './component/userInfo';
import './App.css';
import { UserProvider } from '../src/component/userInfoContext';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/bursa/main' element={<Main />} />
        <Route path='/bursa/main/userInfo' element={<UserInfo />} />
        <Route path='/bursa/main/portfolio' element={<Portfolio />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
