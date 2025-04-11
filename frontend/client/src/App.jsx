// client/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/signup/signup';
import Landingpage from './components/landingpage/landingpage';
import Dashboard from './components/dashboard/dashboard';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Optional: Redirect any other path to "/" */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
