import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Activities from './pages/Activities';
import Payments from './pages/Payments';
import Notifications from './pages/Notifications';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Provider store = {store}>
      <AuthProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className='flex-grow p-6'>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/members" element={<PrivateRoute><Members /></PrivateRoute>} />
              <Route path="/activities" element={<PrivateRoute><Activities /></PrivateRoute>} />
              <Route path="/payments" element={<PrivateRoute><Payments /></PrivateRoute>} />
              <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;