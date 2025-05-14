import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  // Default suggested data
  const defaultGoals = [
    { goal: 'Lose 5kg in 2 months', date: 'Suggested Timeline: 2 months' },
    { goal: 'Run a 5k marathon', date: 'Suggested Timeline: 3 months' },
    { goal: 'Build muscle strength', date: 'Suggested Timeline: 4 months' },
  ];

  const defaultWorkouts = [
    { exerciseName: 'Push-ups', sets: 3, reps: 15 },
    { exerciseName: 'Squats', sets: 4, reps: 12 },
    { exerciseName: 'Plank', sets: 3, reps: '1 min hold' },
  ];

  const defaultDietPlans = [
    { dietType: 'Breakfast', description: 'Oatmeal with fruits and nuts' },
    { dietType: 'Lunch', description: 'Grilled chicken with quinoa and veggies' },
    { dietType: 'Dinner', description: 'Salmon with steamed broccoli' },
  ];

  const motivationalMessage = "Stay consistent, and you'll achieve your fitness goals!";

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 shadow-lg p-4">
        <ul className="flex justify-center gap-6">
          <li>
            <Link to="/dashboard" className="hover:underline font-semibold">Dashboard</Link>
          </li>
          <li>
            <Link to="/goals" className="hover:underline font-semibold">Goals</Link>
          </li>
          <li>
            <Link to="/workouts" className="hover:underline font-semibold">Workouts</Link>
          </li>
          <li>
            <Link to="/diet" className="hover:underline font-semibold">Diet</Link>
          </li>
          <li>
            <Link to="/progress" className="hover:underline font-semibold">Progress</Link>
          </li>
        </ul>
      </nav>

      {/* Dashboard Content */}
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome, {username || 'User'}!</h1>
          <p className="text-gray-600">{motivationalMessage}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Suggested Data Section */}
        <div className="w-full flex flex-col gap-6">
          {/* Suggested Goals */}
          <div className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Suggested Goals</h3>
            <ul className="list-disc list-inside">
              {defaultGoals.map((goal, index) => (
                <li key={index} className="mb-2">
                  <span className="font-medium">{goal.goal}</span> - <span>{goal.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Workouts */}
          <div className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Suggested Workouts</h3>
            <ul className="list-disc list-inside">
              {defaultWorkouts.map((workout, index) => (
                <li key={index} className="mb-2">
                  <span className="font-medium">{workout.exerciseName}</span> - {workout.sets} sets x {workout.reps}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Diet Plans */}
          <div className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Suggested Diet Plans</h3>
            <ul className="list-disc list-inside">
              {defaultDietPlans.map((diet, index) => (
                <li key={index} className="mb-2">
                  <span className="font-medium">{diet.dietType}</span>: {diet.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


