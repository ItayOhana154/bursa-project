import './App.css';
import Login from './component/login';
import { Routes, Route } from 'react-router-dom';
import HomePage from './component/homePage';
import Register from './component/register';
import Main from './component/main';
import Portfolio from './component/portfilo';
import UserInfo from './component/userInfo';
import Company from './component/company';
import './App.css';
import { UserInfoContext } from '../src/component/userInfoContext';
import { StokeProvider } from '../src/component/stokeNameContext';
import { useContext } from 'react';

function App() {
  const {myInfo} = useContext(UserInfoContext);
  
  if (myInfo.id) {
    return (
      <StokeProvider>
        <Routes>
          <Route path='/bursa/main' element={<Main />} />
          <Route path='/bursa/main/userInfo' element={<UserInfo />} />
          <Route path='/bursa/main/portfolio' element={<Portfolio />} />
          <Route path='/bursa/main/stoke' element={<Company />} />
          <Route path='/*' element={<Main />} />
        </Routes>
      </StokeProvider>
    );
  } else {
    return (
      <StokeProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<HomePage />} />
        </Routes>
      </StokeProvider>
    );
  }
}

export default App;
