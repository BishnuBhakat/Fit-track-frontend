import { useState, useEffect } from 'react';
import api from '../api.js';

export default function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [date, setDate] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const username = localStorage.getItem('username');


  const fetchWorkouts = async () => {
    try {
      const res = await api.get(`/workout/?username=${username}`);
      setWorkouts(res.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };


  const addWorkout = async () => {
    if (!date || !exerciseName || !sets || !reps || !caloriesBurned) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await api.post('/workout/add', {
        username,
        workout: {
          date,
          exerciseName,
          sets,
          reps,
          calories_burned: caloriesBurned,
        },
      });

      setDate('');
      setExerciseName('');
      setSets('');
      setReps('');
      setCaloriesBurned('');
      fetchWorkouts();
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await api.delete(`/workout/delete/${id}`);
      fetchWorkouts();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-8">Track Your Workouts</h2>

      {/* Form to Add Workout */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Add a New Workout</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Exercise Name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Calories Burned"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
          />
          <button
            onClick={addWorkout}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold w-full py-3 rounded transition duration-300"
          >
            Add Workout
          </button>
        </div>
      </div>

      {/* List of Workouts */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">Your Workouts</h3>
        <ul className="space-y-4">
          {workouts.length > 0 ? (
            workouts.map((w) => (
              <li
                key={w.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 p-4 rounded bg-gray-50 shadow"
              >
                <div>
                  <p className="font-medium text-lg">Date: {w.date}</p>
                  <p className="text-gray-700">Exercise: {w.exerciseName}</p>
                  <p className="text-gray-700">Sets: {w.sets}</p>
                  <p className="text-gray-700">Reps: {w.reps}</p>
                  <p className="text-gray-700">Calories Burned: {w.calories_burned}</p>
                </div>
                <button
                  onClick={() => deleteWorkout(w.id)}
                  className="text-red-500 hover:text-red-600 font-semibold mt-4 md:mt-0"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No workouts found. Add one above!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
