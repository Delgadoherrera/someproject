import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LOGIN, LOGOUT, PRIVATE, REGISTER } from './config/routes/paths'
import { AuthContextProvider } from './contexts/authContext'
import PublicRoute from './components/router/PublicRoute'
import PrivateRoute from './components/router/PrivateRoute'
import Home from './views/Home'

import Logout from './views/Logout'
import Private from './views/Private'
import UserRegister from './views/UserRegister';
import UserLogin from './views/UserLogin'


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute />}>
            <Route index element={<Home />} />
            {<Route path={LOGIN} element={<UserLogin />} />}
            <Route path={REGISTER} element={<UserRegister
            />} />
          </Route>
          <Route path={PRIVATE} element={<PrivateRoute />}>
            <Route path={PRIVATE} element={<Private />} />
            <Route path={LOGOUT} element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
