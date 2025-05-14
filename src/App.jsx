import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Goal from './components/Goal';
import Workout from './components/Workout';
import DietPlan from './components/DietPlan';
import Progress from './components/Progress';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> {/* default route link click korlei ekhane jabe  */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        {/* Protected Routes access korte parbe na without login ba register */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goal />} />
        <Route path="/workouts" element={<Workout />} />
        <Route path="/diet" element={<DietPlan />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default App;
