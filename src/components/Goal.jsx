import { useState, useEffect } from 'react';
import api from '../api.js';

export default function Goal() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('Weight Loss'); 
  const [date, setDate] = useState('');
  const username = localStorage.getItem('username');

 
  const fetchGoals = async () => {
    try {
      const res = await api.get(`/goal/?username=${username}`);
      setGoals(res.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const addGoal = async () => {
    if (!selectedGoal || !date) {
      alert('Please select a goal and a date.');
      return;
    }
    try {
      await api.post('/goal/add', {
        username,
        goal: { date, goal: selectedGoal },
      });
      setDate('');
      setSelectedGoal('Weight Loss');
      fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await api.delete(`/goal/delete/${id}`);
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-8">Set Your Goals</h2>

      {/* Input for Goal and Date */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Add a New Goal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
          >
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Build">Muscle Build</option>
            <option value="Fit and Healthy">Fit and Healthy</option>
          </select>
          <div className="flex flex-col space-y-1">
            <label htmlFor="date" className="text-gray-700 text-sm font-medium">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            onClick={addGoal}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-3 rounded transition duration-300"
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* List of Goals */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">Your Goals</h3>
        <ul className="space-y-4">
          {goals.length > 0 ? (
            goals.map((g) => (
              <li
                key={g.id}
                className="flex justify-between items-center border border-gray-300 p-4 rounded bg-gray-50 shadow"
              >
                <div>
                  <p className="font-medium text-lg">{g.goal}</p>
                  <p className="text-sm text-gray-500">Date: {g.date}</p>
                </div>
                <button
                  onClick={() => deleteGoal(g.id)}
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No goals found. Add one above!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
